import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type {
  AppendEventInput,
  CreateApprovalInput,
  CreateConversationInput,
  CreateSessionInput,
  MCPApproval,
  MCPConversation,
  MCPConversationEvent,
  MCPPersistenceData,
  MCPSession,
} from './types.ts';
import {
  createId,
  nowIso,
  type MCPPersistence,
  updateSessionStatus,
} from './persistence.server.ts';

const EMPTY_DATA: MCPPersistenceData = {
  conversations: [],
  sessions: [],
  events: [],
  approvals: [],
};

export class FileMCPPersistence implements MCPPersistence {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async createConversation(
    input: CreateConversationInput,
  ): Promise<MCPConversation> {
    return this.withData(async (data) => {
      const now = nowIso();
      const conversation: MCPConversation = {
        id: createId('conv'),
        siteId: input.siteId,
        userId: input.userId,
        title: input.title ?? null,
        status: 'active',
        createdAt: now,
        updatedAt: now,
        lastUsedAt: now,
        metadata: input.metadata ?? {},
      };
      data.conversations.push(conversation);
      return conversation;
    });
  }

  async getConversation(id: string): Promise<MCPConversation | null> {
    const data = await this.readData();
    return data.conversations.find((item) => item.id === id) ?? null;
  }

  async listConversations(args: {
    userId: string;
    siteId?: string;
  }): Promise<MCPConversation[]> {
    const data = await this.readData();
    return data.conversations
      .filter((item) => item.userId === args.userId)
      .filter((item) => !args.siteId || item.siteId === args.siteId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async createSession(input: CreateSessionInput): Promise<MCPSession> {
    return this.withData(async (data) => {
      const now = nowIso();
      const session: MCPSession = {
        id: createId('mcp'),
        conversationId: input.conversationId,
        siteId: input.siteId,
        userId: input.userId,
        origin: 'seven-web',
        status: 'active',
        scopes: input.scopes,
        approvalPolicy: input.approvalPolicy,
        tokenJti: input.tokenJti,
        createdAt: now,
        updatedAt: now,
        expiresAt: input.expiresAt,
        lastUsedAt: now,
        revokedAt: null,
        revokeReason: null,
        authBinding: {
          kind: 'seven-auth-cookie',
        },
        clientMetadata: input.clientMetadata ?? {},
      };
      data.sessions.push(session);
      return session;
    });
  }

  async getSession(id: string): Promise<MCPSession | null> {
    const data = await this.readData();
    return data.sessions.find((item) => item.id === id) ?? null;
  }

  async listSessions(conversationId: string): Promise<MCPSession[]> {
    const data = await this.readData();
    return data.sessions.filter(
      (item) => item.conversationId === conversationId,
    );
  }

  async touchSession(
    id: string,
    updates?: Partial<
      Pick<MCPSession, 'status' | 'expiresAt' | 'tokenJti' | 'revokeReason'>
    >,
  ): Promise<MCPSession | null> {
    return this.withData(async (data) => {
      const index = data.sessions.findIndex((item) => item.id === id);
      if (index === -1) return null;
      const current = data.sessions[index];
      const now = nowIso();
      const next =
        updates?.status && updates.status !== current.status
          ? updateSessionStatus(current, updates.status, now)
          : {
              ...current,
              updatedAt: now,
              lastUsedAt: now,
            };

      data.sessions[index] = {
        ...next,
        expiresAt: updates?.expiresAt ?? next.expiresAt,
        tokenJti: updates?.tokenJti ?? next.tokenJti,
        revokeReason: updates?.revokeReason ?? next.revokeReason,
      };
      return data.sessions[index];
    });
  }

  async appendEvent(input: AppendEventInput): Promise<MCPConversationEvent> {
    return this.withData(async (data) => {
      const sequence =
        data.events
          .filter((item) => item.conversationId === input.conversationId)
          .at(-1)?.sequence ?? 0;
      const event: MCPConversationEvent = {
        id: createId('evt'),
        conversationId: input.conversationId,
        sessionId: input.sessionId ?? null,
        sequence: sequence + 1,
        eventType: input.eventType,
        createdAt: nowIso(),
        actorType: input.actorType,
        actorId: input.actorId ?? null,
        payload: input.payload ?? {},
        summary: input.summary ?? null,
        contentRefs: input.contentRefs ?? [],
      };
      data.events.push(event);
      const conversation = data.conversations.find(
        (item) => item.id === input.conversationId,
      );
      if (conversation) {
        conversation.updatedAt = event.createdAt;
        conversation.lastUsedAt = event.createdAt;
      }
      return event;
    });
  }

  async listEvents(conversationId: string): Promise<MCPConversationEvent[]> {
    const data = await this.readData();
    return data.events.filter((item) => item.conversationId === conversationId);
  }

  async createApproval(input: CreateApprovalInput): Promise<MCPApproval> {
    return this.withData(async (data) => {
      const approval: MCPApproval = {
        id: createId('apr'),
        conversationId: input.conversationId,
        sessionId: input.sessionId,
        toolName: input.toolName,
        decision: 'pending',
        createdAt: nowIso(),
        decidedAt: null,
        decidedBy: null,
        expiresAt: input.expiresAt,
        payloadHash: input.payloadHash,
        summary: input.summary,
        preview: input.preview ?? {},
        payload: input.payload ?? {},
        contentRefs: input.contentRefs ?? [],
      };
      data.approvals.push(approval);
      return approval;
    });
  }

  async getApproval(id: string): Promise<MCPApproval | null> {
    const data = await this.readData();
    return data.approvals.find((item) => item.id === id) ?? null;
  }

  async decideApproval(args: {
    id: string;
    decision: 'approved' | 'denied' | 'expired';
    decidedBy?: string | null;
  }): Promise<MCPApproval | null> {
    return this.withData(async (data) => {
      const index = data.approvals.findIndex((item) => item.id === args.id);
      if (index === -1) return null;

      data.approvals[index] = {
        ...data.approvals[index],
        decision: args.decision,
        decidedAt: nowIso(),
        decidedBy: args.decidedBy ?? null,
      };

      return data.approvals[index];
    });
  }

  async revokeSession(id: string, reason: string): Promise<MCPSession | null> {
    return this.withData(async (data) => {
      const index = data.sessions.findIndex((item) => item.id === id);
      if (index === -1) return null;
      const revoked = updateSessionStatus(data.sessions[index], 'revoked');
      data.sessions[index] = {
        ...revoked,
        revokeReason: reason,
      };
      return data.sessions[index];
    });
  }

  async readData(): Promise<MCPPersistenceData> {
    try {
      const contents = await readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(contents) as MCPPersistenceData;
      return {
        ...EMPTY_DATA,
        ...parsed,
      };
    } catch {
      return structuredClone(EMPTY_DATA);
    }
  }

  private async withData<T>(
    callback: (data: MCPPersistenceData) => Promise<T> | T,
  ): Promise<T> {
    const data = await this.readData();
    const result = await callback(data);
    await mkdir(path.dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    return result;
  }
}

export function defaultMCPStorageFile(
  root = process.env.MCP_STORAGE_DIR ||
    path.join(os.tmpdir(), 'plone-seven', 'mcp'),
): string {
  return path.join(root, 'mcp-state.json');
}
