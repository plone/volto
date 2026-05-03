import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { action, loader } from './session.server';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { issueMCPSessionToken } from '../token.server';

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi.fn().mockResolvedValue('plone.jwt.token'),
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn().mockReturnValue({
    sub: 'admin',
    fullname: 'Administrator',
  }),
}));

vi.mock('seven/app/config/mcp.server', () => ({
  getMCPPersistence: vi.fn().mockReturnValue({
    getSession: vi.fn().mockResolvedValue({
      id: 'mcp_1',
      conversationId: 'conv_1',
      siteId: 'http://localhost:8080/Plone',
      userId: 'admin',
      origin: 'seven-web',
      status: 'active',
      scopes: ['site.read', 'content.read'],
      approvalPolicy: 'standard_editor',
      tokenJti: 'jti_1',
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-01T10:00:00.000Z',
      expiresAt: '2099-05-01T10:00:00.000Z',
      lastUsedAt: '2026-05-01T10:00:00.000Z',
      revokedAt: null,
      revokeReason: null,
      authBinding: { kind: 'seven-auth-cookie' },
      clientMetadata: {},
    }),
    touchSession: vi.fn(),
    getConversation: vi.fn().mockResolvedValue({
      id: 'conv_1',
      userId: 'admin',
      siteId: 'http://localhost:8080/Plone',
      title: 'Test conversation',
      status: 'active',
      createdAt: '2026-05-01T10:00:00.000Z',
      updatedAt: '2026-05-01T10:00:00.000Z',
      lastUsedAt: '2026-05-01T10:00:00.000Z',
      metadata: {},
    }),
    listSessions: vi.fn().mockResolvedValue([]),
    listEvents: vi.fn().mockResolvedValue([]),
  }),
  bootstrapAuthenticatedMCPSession: vi.fn().mockResolvedValue({
    conversation: {
      id: 'conv_1',
      userId: 'admin',
    },
    session: {
      id: 'mcp_1',
      userId: 'admin',
      scopes: ['content.read'],
    },
    token: 'session.token',
    expiresAt: '2026-05-01T10:00:00.000Z',
  }),
}));

describe('mcp session route action', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('bootstraps an MCP session from the authenticated Plone user session', async () => {
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      getSite: vi.fn().mockResolvedValue({
        data: {
          '@id': 'http://localhost:8080/Plone',
          'plone.site_title': 'Plone',
        },
      }),
    } as any);

    const request = new Request('http://example.com/@mcp/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test conversation',
      }),
    });

    const response = await action({
      request,
      params: {},
      context,
      unstable_pattern: '/@mcp/session',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      conversation: {
        id: 'conv_1',
        userId: 'admin',
      },
      session: {
        id: 'mcp_1',
        userId: 'admin',
        scopes: ['content.read'],
      },
      token: 'session.token',
      expiresAt: '2026-05-01T10:00:00.000Z',
      user: {
        id: 'admin',
        fullname: 'Administrator',
      },
      site: {
        id: 'http://localhost:8080/Plone',
        title: 'Plone',
      },
    });
  });

  it('returns session inspection data from the MCP bearer token', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const request = new Request('http://example.com/@mcp/session', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await loader({
      request,
      params: {},
      context: new RouterContextProvider(),
    } as any);

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      conversation: expect.objectContaining({
        id: 'conv_1',
      }),
      session: expect.objectContaining({
        id: 'mcp_1',
      }),
      sessions: [],
      eventCount: 0,
    });
  });
});
