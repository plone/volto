export type MCPToolScope =
  | 'site.read'
  | 'content.read'
  | 'content.search'
  | 'content.write'
  | 'workflow.write'
  | 'schema.read'
  | 'blocks.read';

export type MCPApprovalPolicy =
  | 'read_only'
  | 'standard_editor'
  | 'strict_confirm';

export type MCPConversationStatus = 'active' | 'archived';

export type MCPSessionStatus =
  | 'active'
  | 'waiting_for_approval'
  | 'reauth_required'
  | 'revoked'
  | 'expired'
  | 'closed';

export type MCPEventType =
  | 'session_started'
  | 'user_message'
  | 'assistant_message'
  | 'tool_call_requested'
  | 'tool_call_completed'
  | 'tool_call_failed'
  | 'approval_requested'
  | 'approval_granted'
  | 'approval_denied'
  | 'session_auth_expired'
  | 'session_rebound';

export interface MCPConversation {
  id: string;
  siteId: string;
  userId: string;
  title: string | null;
  status: MCPConversationStatus;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string;
  metadata: Record<string, unknown>;
}

export interface MCPSession {
  id: string;
  conversationId: string;
  siteId: string;
  userId: string;
  origin: 'seven-web';
  status: MCPSessionStatus;
  scopes: MCPToolScope[];
  approvalPolicy: MCPApprovalPolicy;
  tokenJti: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  lastUsedAt: string;
  revokedAt: string | null;
  revokeReason: string | null;
  authBinding: {
    kind: 'seven-auth-cookie';
  };
  clientMetadata: Record<string, unknown>;
}

export interface MCPConversationEvent {
  id: string;
  conversationId: string;
  sessionId: string | null;
  sequence: number;
  eventType: MCPEventType;
  createdAt: string;
  actorType: 'user' | 'assistant' | 'system';
  actorId: string | null;
  payload: Record<string, unknown>;
  summary: string | null;
  contentRefs: Array<Record<string, unknown>>;
}

export interface MCPApproval {
  id: string;
  conversationId: string;
  sessionId: string;
  toolName: string;
  decision: 'pending' | 'approved' | 'denied' | 'expired';
  createdAt: string;
  decidedAt: string | null;
  decidedBy: string | null;
  expiresAt: string;
  payloadHash: string;
  summary: string;
  preview: Record<string, unknown>;
  payload: Record<string, unknown>;
  contentRefs: Array<Record<string, unknown>>;
}

export interface MCPPersistenceData {
  conversations: MCPConversation[];
  sessions: MCPSession[];
  events: MCPConversationEvent[];
  approvals: MCPApproval[];
}

export interface CreateConversationInput {
  siteId: string;
  userId: string;
  title?: string | null;
  metadata?: Record<string, unknown>;
}

export interface CreateSessionInput {
  conversationId: string;
  siteId: string;
  userId: string;
  scopes: MCPToolScope[];
  approvalPolicy: MCPApprovalPolicy;
  tokenJti: string;
  expiresAt: string;
  clientMetadata?: Record<string, unknown>;
}

export interface AppendEventInput {
  conversationId: string;
  sessionId?: string | null;
  eventType: MCPEventType;
  actorType: 'user' | 'assistant' | 'system';
  actorId?: string | null;
  payload?: Record<string, unknown>;
  summary?: string | null;
  contentRefs?: Array<Record<string, unknown>>;
}

export interface CreateApprovalInput {
  conversationId: string;
  sessionId: string;
  toolName: string;
  expiresAt: string;
  payloadHash: string;
  summary: string;
  preview?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  contentRefs?: Array<Record<string, unknown>>;
}
