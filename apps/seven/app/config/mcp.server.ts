import {
  bootstrapMCPSession,
  type BootstrapMCPSessionResult,
} from '@plone/mcp/session.server';
import { createMCPPersistence } from '@plone/mcp/config.server';
import type { MCPPersistence } from '@plone/mcp/persistence.server';

let persistence: MCPPersistence | null = null;

export function getMCPPersistence(): MCPPersistence {
  if (!persistence) {
    persistence = createMCPPersistence();
  }
  return persistence;
}

export async function bootstrapAuthenticatedMCPSession(args: {
  userId: string;
  siteId: string;
  siteTitle?: string;
  conversationId?: string;
  conversationTitle?: string | null;
  issuer?: string;
}): Promise<BootstrapMCPSessionResult> {
  return bootstrapMCPSession({
    persistence: getMCPPersistence(),
    userId: args.userId,
    siteId: args.siteId,
    siteTitle: args.siteTitle,
    conversationId: args.conversationId,
    conversationTitle: args.conversationTitle,
    issuer: args.issuer,
  });
}
