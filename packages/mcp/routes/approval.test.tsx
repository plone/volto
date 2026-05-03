import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { action, loader } from './approval.server';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { issueMCPSessionToken } from '../token.server';

const {
  getApprovalMock,
  decideApprovalMock,
  touchSessionMock,
  appendEventMock,
} = vi.hoisted(() => ({
  getApprovalMock: vi.fn(),
  decideApprovalMock: vi.fn(),
  touchSessionMock: vi.fn(),
  appendEventMock: vi.fn(),
}));

vi.mock('@plone/registry', () => ({
  default: {
    settings: {
      apiPath: 'http://localhost:8080/Plone',
    },
  },
}));

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi.fn().mockResolvedValue('plone.jwt.token'),
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn().mockReturnValue({
    sub: 'admin',
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
      status: 'waiting_for_approval',
      scopes: ['content.read', 'content.write'],
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
    touchSession: touchSessionMock,
    getApproval: getApprovalMock,
    decideApproval: decideApprovalMock,
    appendEvent: appendEventMock,
  }),
}));

describe('mcp approval route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    getApprovalMock.mockReset();
    decideApprovalMock.mockReset();
    touchSessionMock.mockReset();
    appendEventMock.mockReset();
  });

  function createPendingApproval() {
    return {
      id: 'apr_1',
      conversationId: 'conv_1',
      sessionId: 'mcp_1',
      toolName: 'content.update',
      decision: 'pending',
      createdAt: '2026-05-01T10:01:00.000Z',
      decidedAt: null,
      decidedBy: null,
      expiresAt: '2099-05-01T10:11:00.000Z',
      payloadHash: 'hash_1',
      summary: 'Update title on /news/item',
      preview: {
        target: '/news/item',
        changes: { title: 'Updated title' },
        reason: 'User requested a better headline',
      },
      payload: {
        path: '/news/item',
        changes: { title: 'Updated title' },
        reason: 'User requested a better headline',
      },
      contentRefs: [{ path: '/news/item' }],
    };
  }

  it('returns the approval record for the active MCP session', async () => {
    getApprovalMock.mockResolvedValue(createPendingApproval());

    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['content.read', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const request = new Request('http://example.com/@mcp/approvals/apr_1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await loader({
      request,
      params: { '*': 'apr_1' },
      context: new RouterContextProvider(),
    } as any);

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual(
      expect.objectContaining({
        id: 'apr_1',
        toolName: 'content.update',
      }),
    );
  });

  it('approves and executes content.update from the stored approval payload', async () => {
    getApprovalMock.mockResolvedValue(createPendingApproval());
    decideApprovalMock.mockResolvedValue({
      ...createPendingApproval(),
      decision: 'approved',
      decidedAt: '2026-05-01T10:02:00.000Z',
      decidedBy: 'admin',
    });

    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      updateContent: vi.fn().mockResolvedValue({
        data: {
          '@id': 'http://localhost:8080/Plone/news/item',
          '@type': 'News Item',
          UID: 'uid-1',
          title: 'Updated title',
          description: 'Item description',
          modified: '2026-05-01T10:02:00Z',
          language: 'en',
          review_state: 'private',
        },
      }),
    } as any);

    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['content.read', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const request = new Request('http://example.com/@mcp/approvals/apr_1', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        decision: 'approved',
      }),
    });

    const response = await action({
      request,
      params: { '*': 'apr_1' },
      context,
      unstable_pattern: '/@mcp/approvals/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect(decideApprovalMock).toHaveBeenCalledWith({
      id: 'apr_1',
      decision: 'approved',
      decidedBy: 'admin',
    });
    expect((response as any).data).toEqual({
      approval: expect.objectContaining({
        id: 'apr_1',
        decision: 'approved',
      }),
      result: {
        item: {
          id: '/news/item',
          uid: 'uid-1',
          path: '/news/item',
          type: 'News Item',
          title: 'Updated title',
          description: 'Item description',
          language: 'en',
          reviewState: 'private',
          modified: '2026-05-01T10:02:00Z',
        },
        fields: {
          title: 'Updated title',
          description: 'Item description',
        },
      },
    });
  });

  it('denies a pending approval without executing a Plone write', async () => {
    getApprovalMock.mockResolvedValue(createPendingApproval());
    decideApprovalMock.mockResolvedValue({
      ...createPendingApproval(),
      decision: 'denied',
      decidedAt: '2026-05-01T10:02:00.000Z',
      decidedBy: 'admin',
    });

    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['content.read', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const request = new Request('http://example.com/@mcp/approvals/apr_1', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        decision: 'denied',
      }),
    });

    const response = await action({
      request,
      params: { '*': 'apr_1' },
      context: new RouterContextProvider(),
      unstable_pattern: '/@mcp/approvals/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect(decideApprovalMock).toHaveBeenCalledWith({
      id: 'apr_1',
      decision: 'denied',
      decidedBy: 'admin',
    });
    expect((response as any).data).toEqual({
      approval: expect.objectContaining({
        id: 'apr_1',
        decision: 'denied',
      }),
    });
  });
});
