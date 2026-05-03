import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { action } from './chat.server';
import { issueMCPSessionToken } from '../token.server';
import { setMCPChatProvider } from '../chat.server';
import { ploneClientContext } from 'seven/app/config/plone-context';

const { appendEventMock, listEventsMock } = vi.hoisted(() => ({
  appendEventMock: vi.fn(),
  listEventsMock: vi.fn(),
}));

const noopProvider = {
  async sendTurn() {
    throw new Error('No MCP chat provider is configured');
  },
};

vi.mock('seven/app/config/mcp.server', () => ({
  getMCPPersistence: vi.fn().mockReturnValue({
    getSession: vi.fn().mockResolvedValue({
      id: 'mcp_1',
      conversationId: 'conv_1',
      siteId: 'http://localhost:8080/Plone',
      userId: 'admin',
      origin: 'seven-web',
      status: 'active',
      scopes: ['site.read', 'content.read', 'content.write'],
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
    appendEvent: appendEventMock,
    listEvents: listEventsMock,
  }),
}));

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi
    .fn()
    .mockResolvedValue('header.eyJzdWIiOiJhZG1pbiJ9.sig'),
}));

describe('mcp chat route', () => {
  beforeEach(() => {
    setMCPChatProvider(noopProvider);
    appendEventMock.mockReset();
    listEventsMock.mockReset();
    appendEventMock
      .mockResolvedValueOnce({
        id: 'evt_user',
        eventType: 'user_message',
        payload: { text: 'Hello MCP' },
      })
      .mockResolvedValueOnce({
        id: 'evt_assistant',
        eventType: 'assistant_message',
        payload: { text: 'Assistant reply' },
      });
    listEventsMock.mockResolvedValue([]);
  });

  afterEach(() => {
    setMCPChatProvider(noopProvider);
  });

  function createToken() {
    return issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    }).token;
  }

  function createContext() {
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      getSite: vi.fn().mockResolvedValue({
        data: {
          '@id': 'http://localhost:8080/Plone',
          'plone.site_title': 'Plone site',
          'plone.default_language': 'en',
        },
      }),
    } as any);
    return context;
  }

  it('persists the user event and returns a provider reply', async () => {
    setMCPChatProvider({
      async sendTurn() {
        return {
          text: 'Assistant reply',
        };
      },
    });

    const request = new Request('http://example.com/@mcp/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello MCP',
      }),
    });

    const response = await action({
      request,
      params: {},
      context: createContext(),
      unstable_pattern: '/@mcp/chat/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(201);
    expect((response as any).data).toEqual({
      userEvent: expect.objectContaining({
        id: 'evt_user',
        eventType: 'user_message',
      }),
      assistantEvent: expect.objectContaining({
        id: 'evt_assistant',
        eventType: 'assistant_message',
      }),
    });
  });

  it('lets the provider call MCP read tools through the chat runtime', async () => {
    appendEventMock.mockReset();
    appendEventMock
      .mockResolvedValueOnce({
        id: 'evt_user',
        eventType: 'user_message',
        payload: { text: 'What site is this?' },
      })
      .mockResolvedValueOnce({
        id: 'evt_tool_request',
        eventType: 'tool_call_requested',
      })
      .mockResolvedValueOnce({
        id: 'evt_tool_completed',
        eventType: 'tool_call_completed',
      })
      .mockResolvedValueOnce({
        id: 'evt_assistant',
        eventType: 'assistant_message',
        payload: { text: 'You are on Plone site.' },
      });

    setMCPChatProvider({
      async sendTurn({ runtime }) {
        const site = (await runtime.executeTool('site.get_context', {})) as {
          site: { title: string | null };
        };

        return {
          text: `You are on ${site.site.title}.`,
        };
      },
    });

    const request = new Request('http://example.com/@mcp/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What site is this?',
      }),
    });

    const response = await action({
      request,
      params: {},
      context: createContext(),
      unstable_pattern: '/@mcp/chat/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(201);
    expect((response as any).data).toEqual({
      userEvent: expect.objectContaining({
        id: 'evt_user',
      }),
      assistantEvent: expect.objectContaining({
        id: 'evt_assistant',
      }),
    });
    expect(appendEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: 'tool_call_requested',
        payload: expect.objectContaining({
          tool: 'site.get_context',
        }),
      }),
    );
    expect(appendEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: 'tool_call_completed',
        payload: expect.objectContaining({
          tool: 'site.get_context',
        }),
      }),
    );
  });

  it('returns 501 when no chat provider is configured', async () => {
    const request = new Request('http://example.com/@mcp/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello MCP',
      }),
    });

    const response = await action({
      request,
      params: {},
      context: createContext(),
      unstable_pattern: '/@mcp/chat/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(501);
    expect((response as any).data).toEqual({
      message: 'No MCP chat provider is configured',
      userEvent: expect.objectContaining({
        id: 'evt_user',
        eventType: 'user_message',
      }),
    });
  });
});
