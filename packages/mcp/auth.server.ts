import type { MCPPersistence } from './persistence.server.ts';
import {
  verifyMCPSessionToken,
  type MCPSessionTokenClaims,
} from './token.server.ts';
import type { MCPSession } from './types.ts';

export interface AuthenticatedMCPSession {
  claims: MCPSessionTokenClaims;
  session: MCPSession;
}

export function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get('Authorization');
  if (!authorization) return null;
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

export async function authenticateMCPSessionRequest(
  request: Request,
  persistence: MCPPersistence,
): Promise<AuthenticatedMCPSession> {
  const token = getBearerToken(request);
  if (!token) {
    throw new Error('Missing MCP session bearer token');
  }

  const claims = verifyMCPSessionToken(token);
  const session = await persistence.getSession(claims.sid);

  if (!session) {
    throw new Error('Unknown MCP session');
  }
  if (session.tokenJti !== claims.jti) {
    throw new Error('MCP session token does not match the live session');
  }
  if (
    session.status !== 'active' &&
    session.status !== 'waiting_for_approval'
  ) {
    throw new Error(`MCP session is not executable: ${session.status}`);
  }
  if (session.expiresAt <= new Date().toISOString()) {
    throw new Error('MCP session has expired');
  }

  await persistence.touchSession(session.id);

  return {
    claims,
    session,
  };
}
