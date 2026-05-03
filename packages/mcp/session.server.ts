import type { MCPPersistence } from './persistence.server.ts';
import { getMCPSessionTtlMs } from './config.server.ts';
import { issueMCPSessionToken } from './token.server.ts';
import type {
  MCPApprovalPolicy,
  MCPConversation,
  MCPToolScope,
  MCPSession,
} from './types.ts';

export interface BootstrapMCPSessionInput {
  persistence: MCPPersistence;
  userId: string;
  siteId: string;
  siteTitle?: string;
  conversationId?: string;
  conversationTitle?: string | null;
  scopes?: MCPToolScope[];
  approvalPolicy?: MCPApprovalPolicy;
  issuer?: string;
}

export interface BootstrapMCPSessionResult {
  conversation: MCPConversation;
  session: MCPSession;
  token: string;
  expiresAt: string;
}

export const DEFAULT_V1_SCOPES: MCPToolScope[] = [
  'site.read',
  'content.read',
  'content.search',
  'content.write',
  'workflow.write',
  'schema.read',
  'blocks.read',
];

export async function bootstrapMCPSession(
  input: BootstrapMCPSessionInput,
): Promise<BootstrapMCPSessionResult> {
  const conversation =
    (input.conversationId
      ? await input.persistence.getConversation(input.conversationId)
      : null) ??
    (await input.persistence.createConversation({
      siteId: input.siteId,
      userId: input.userId,
      title: input.conversationTitle ?? null,
      metadata: input.siteTitle ? { siteTitle: input.siteTitle } : {},
    }));

  const ttlMs = getMCPSessionTtlMs();
  const provisionalSession = await input.persistence.createSession({
    conversationId: conversation.id,
    siteId: input.siteId,
    userId: input.userId,
    scopes: input.scopes ?? DEFAULT_V1_SCOPES,
    approvalPolicy: input.approvalPolicy ?? 'standard_editor',
    tokenJti: 'pending',
    expiresAt: new Date(Date.now() + ttlMs).toISOString(),
  });

  const issued = issueMCPSessionToken({
    iss: input.issuer ?? 'seven',
    sub: input.userId,
    sid: provisionalSession.id,
    cid: conversation.id,
    site: input.siteId,
    scp: provisionalSession.scopes,
    apl: provisionalSession.approvalPolicy,
    ttlMs,
  });

  const session = (await input.persistence.touchSession(provisionalSession.id, {
    expiresAt: new Date(issued.claims.exp * 1000).toISOString(),
    tokenJti: issued.claims.jti,
  })) as MCPSession;
  await input.persistence.appendEvent({
    conversationId: conversation.id,
    sessionId: session.id,
    eventType: 'session_started',
    actorType: 'system',
    actorId: input.userId,
    payload: {
      siteId: input.siteId,
      scopes: session.scopes,
      approvalPolicy: session.approvalPolicy,
    },
    summary: 'MCP session started',
  });

  return {
    conversation,
    session,
    token: issued.token,
    expiresAt: new Date(issued.claims.exp * 1000).toISOString(),
  };
}
