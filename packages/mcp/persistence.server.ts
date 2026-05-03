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
  MCPSessionStatus,
} from './types.ts';

export interface MCPPersistence {
  createConversation(input: CreateConversationInput): Promise<MCPConversation>;
  getConversation(id: string): Promise<MCPConversation | null>;
  listConversations(args: {
    userId: string;
    siteId?: string;
  }): Promise<MCPConversation[]>;
  createSession(input: CreateSessionInput): Promise<MCPSession>;
  getSession(id: string): Promise<MCPSession | null>;
  listSessions(conversationId: string): Promise<MCPSession[]>;
  touchSession(
    id: string,
    updates?: Partial<
      Pick<MCPSession, 'status' | 'expiresAt' | 'tokenJti' | 'revokeReason'>
    >,
  ): Promise<MCPSession | null>;
  appendEvent(input: AppendEventInput): Promise<MCPConversationEvent>;
  listEvents(conversationId: string): Promise<MCPConversationEvent[]>;
  createApproval(input: CreateApprovalInput): Promise<MCPApproval>;
  getApproval(id: string): Promise<MCPApproval | null>;
  decideApproval(args: {
    id: string;
    decision: 'approved' | 'denied' | 'expired';
    decidedBy?: string | null;
  }): Promise<MCPApproval | null>;
  revokeSession(id: string, reason: string): Promise<MCPSession | null>;
  readData(): Promise<MCPPersistenceData>;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function createId(prefix: string): string {
  const random = globalThis.crypto.randomUUID().replace(/-/g, '');
  return `${prefix}_${random}`;
}

export function updateSessionStatus(
  session: MCPSession,
  status: MCPSessionStatus,
  now = nowIso(),
): MCPSession {
  return {
    ...session,
    status,
    updatedAt: now,
    lastUsedAt: now,
    revokedAt: status === 'revoked' ? now : session.revokedAt,
  };
}
