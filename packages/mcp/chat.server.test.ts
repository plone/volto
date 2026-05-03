import { describe, expect, it, vi } from 'vitest';
import { createOllamaChatProvider, createMCPChatRuntime } from './chat.server';

describe('mcp chat provider', () => {
  it('runs an Ollama tool loop and returns the final assistant reply', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: {
            role: 'assistant',
            content: '',
            tool_calls: [
              {
                function: {
                  name: 'site.get_context',
                  arguments: {},
                },
              },
            ],
          },
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: {
            role: 'assistant',
            content: 'This site is called Plone site.',
          },
        }),
      } as Response);

    process.env.MCP_CHAT_PROVIDER = 'ollama';
    process.env.MCP_OLLAMA_MODEL = 'qwen3';

    const runtime = await createMCPChatRuntime({
      cli: {
        getSite: vi.fn().mockResolvedValue({
          data: {
            '@id': 'http://localhost:8080/Plone',
            'plone.site_title': 'Plone site',
            'plone.default_language': 'en',
          },
        }),
      } as any,
      site: {
        '@id': 'http://localhost:8080/Plone',
        'plone.site_title': 'Plone site',
        'plone.default_language': 'en',
      } as any,
      siteId: 'http://localhost:8080/Plone',
      conversation: {
        id: 'conv_1',
        userId: 'admin',
        siteId: 'http://localhost:8080/Plone',
        title: 'Test',
        status: 'active',
        createdAt: '2026-05-01T00:00:00.000Z',
        updatedAt: '2026-05-01T00:00:00.000Z',
        lastUsedAt: '2026-05-01T00:00:00.000Z',
        metadata: {},
      },
      session: {
        id: 'mcp_1',
        conversationId: 'conv_1',
        userId: 'admin',
        siteId: 'http://localhost:8080/Plone',
        origin: 'seven-web',
        status: 'active',
        scopes: ['site.read'],
        approvalPolicy: 'standard_editor',
        tokenJti: 'jti_1',
        createdAt: '2026-05-01T00:00:00.000Z',
        updatedAt: '2026-05-01T00:00:00.000Z',
        expiresAt: '2099-05-01T00:00:00.000Z',
        lastUsedAt: '2026-05-01T00:00:00.000Z',
        revokedAt: null,
        revokeReason: null,
        authBinding: { kind: 'seven-auth-cookie' },
        clientMetadata: {},
      },
      user: {
        id: 'admin',
        fullname: 'Admin',
      },
      persistence: {
        appendEvent: vi.fn().mockResolvedValue({}),
      } as any,
    });

    const provider = createOllamaChatProvider(fetchMock);
    const result = await provider.sendTurn({
      conversation: {
        id: 'conv_1',
      } as any,
      session: {
        id: 'mcp_1',
      } as any,
      events: [
        {
          id: 'evt_1',
          eventType: 'user_message',
          payload: { text: 'What site is this?' },
          summary: 'What site is this?',
        } as any,
      ],
      message: 'What site is this?',
      runtime,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      text: 'This site is called Plone site.',
      metadata: {
        provider: 'ollama',
        model: 'qwen3',
      },
    });
  });
});
