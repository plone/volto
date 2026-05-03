import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { action, loader } from './conversation.server';
import { issueMCPSessionToken } from '../token.server';

const {
  listConversationsMock,
  listEventsMock,
  listSessionsMock,
  appendEventMock,
} = vi.hoisted(() => ({
  listConversationsMock: vi.fn(),
  listEventsMock: vi.fn(),
  listSessionsMock: vi.fn(),
  appendEventMock: vi.fn(),
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
    listConversations: listConversationsMock,
    listEvents: listEventsMock,
    listSessions: listSessionsMock,
    appendEvent: appendEventMock,
  }),
}));

describe('mcp conversation route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    listConversationsMock.mockReset();
    listEventsMock.mockReset();
    listSessionsMock.mockReset();
    appendEventMock.mockReset();
  });

  function createToken() {
    return issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['content.read', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    }).token;
  }

  it('lists conversations for the current site-scoped MCP session', async () => {
    listConversationsMock.mockResolvedValue([
      {
        id: 'conv_1',
        title: 'Test conversation',
      },
    ]);

    const request = new Request('http://example.com/@mcp/conversations', {
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    });

    const response = await loader({
      request,
      params: {},
      context: new RouterContextProvider(),
    } as any);

    expect((response as any).init?.status ?? 200).toBe(200);
    expect(listConversationsMock).toHaveBeenCalledWith({
      userId: 'admin',
      siteId: 'http://localhost:8080/Plone',
    });
    expect((response as any).data).toEqual({
      conversations: [
        {
          id: 'conv_1',
          title: 'Test conversation',
        },
      ],
    });
  });

  it('returns one conversation with events and sessions', async () => {
    listEventsMock.mockResolvedValue([
      {
        id: 'evt_1',
        eventType: 'user_message',
      },
    ]);
    listSessionsMock.mockResolvedValue([
      {
        id: 'mcp_1',
      },
    ]);

    const request = new Request(
      'http://example.com/@mcp/conversations/conv_1',
      {
        headers: {
          Authorization: `Bearer ${createToken()}`,
        },
      },
    );

    const response = await loader({
      request,
      params: { '*': 'conv_1' },
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
      sessions: [
        {
          id: 'mcp_1',
        },
      ],
      events: [
        {
          id: 'evt_1',
          eventType: 'user_message',
        },
      ],
    });
  });

  it('appends a user message to the active conversation', async () => {
    appendEventMock.mockResolvedValue({
      id: 'evt_2',
      eventType: 'user_message',
      payload: {
        text: 'Hello MCP',
      },
    });

    const request = new Request(
      'http://example.com/@mcp/conversations/conv_1',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${createToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello MCP',
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'conv_1' },
      context: new RouterContextProvider(),
      unstable_pattern: '/@mcp/conversations/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(201);
    expect(appendEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId: 'conv_1',
        sessionId: 'mcp_1',
        eventType: 'user_message',
        actorType: 'user',
        actorId: 'admin',
        payload: {
          text: 'Hello MCP',
        },
      }),
    );
  });
});
