import { createHmac } from 'node:crypto';
import type { MCPApprovalPolicy, MCPToolScope } from './types.ts';
import { createId } from './persistence.server.ts';

export interface MCPSessionTokenClaims {
  iss: string;
  aud: 'seven-mcp';
  sub: string;
  sid: string;
  cid: string;
  site: string;
  scp: MCPToolScope[];
  iat: number;
  exp: number;
  jti: string;
  ver: 1;
  app: 'seven-web';
  apl: MCPApprovalPolicy;
}

function base64url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function signPart(part: string, secret: string): string {
  return createHmac('sha256', secret).update(part).digest('base64url');
}

function decodePayload<T>(encoded: string): T {
  return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as T;
}

export function createSessionTokenJti(): string {
  return createId('jti');
}

export function issueMCPSessionToken(
  claims: Omit<
    MCPSessionTokenClaims,
    'iat' | 'exp' | 'jti' | 'ver' | 'aud' | 'app'
  > & {
    jti?: string;
    ttlMs: number;
  },
  secret = process.env.MCP_SESSION_SECRET || process.env.COOKIE_SECRET || 'dev',
): { token: string; claims: MCPSessionTokenClaims } {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + Math.floor(claims.ttlMs / 1000);
  const normalizedClaims: MCPSessionTokenClaims = {
    iss: claims.iss,
    aud: 'seven-mcp',
    sub: claims.sub,
    sid: claims.sid,
    cid: claims.cid,
    site: claims.site,
    scp: claims.scp,
    iat,
    exp,
    jti: claims.jti ?? createSessionTokenJti(),
    ver: 1,
    app: 'seven-web',
    apl: claims.apl,
  };
  const payload = base64url(JSON.stringify(normalizedClaims));
  const signature = signPart(payload, secret);
  return {
    token: `${payload}.${signature}`,
    claims: normalizedClaims,
  };
}

export function verifyMCPSessionToken(
  token: string,
  secret = process.env.MCP_SESSION_SECRET || process.env.COOKIE_SECRET || 'dev',
): MCPSessionTokenClaims {
  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    throw new Error('Invalid MCP session token format');
  }

  const expected = signPart(payload, secret);
  if (signature !== expected) {
    throw new Error('Invalid MCP session token signature');
  }

  const claims = decodePayload<MCPSessionTokenClaims>(payload);
  const now = Math.floor(Date.now() / 1000);
  if (claims.aud !== 'seven-mcp') {
    throw new Error('Invalid MCP session token audience');
  }
  if (claims.exp <= now) {
    throw new Error('Expired MCP session token');
  }

  return claims;
}
