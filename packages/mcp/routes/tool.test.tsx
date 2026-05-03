import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { action } from './tool.server';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { issueMCPSessionToken } from '../token.server';

const { createApprovalMock } = vi.hoisted(() => ({
  createApprovalMock: vi.fn().mockResolvedValue({
    id: 'apr_1',
    conversationId: 'conv_1',
    sessionId: 'mcp_1',
    toolName: 'content.update',
    decision: 'pending',
    createdAt: '2026-05-01T10:01:00.000Z',
    decidedAt: null,
    decidedBy: null,
    expiresAt: '2026-05-01T10:11:00.000Z',
    payloadHash: 'hash_1',
    summary: 'Update title on /news/item',
    preview: {
      target: '/news/item',
      changes: {
        title: 'Updated title',
      },
      reason: 'User requested a better headline',
    },
    payload: {
      path: '/news/item',
      changes: {
        title: 'Updated title',
      },
      reason: 'User requested a better headline',
    },
    contentRefs: [{ path: '/news/item' }],
  }),
}));

vi.mock('@plone/registry', () => ({
  default: {
    settings: {
      apiPath: 'http://localhost:8080/Plone',
    },
    blocks: {
      blocksConfig: {
        text: {
          id: 'text',
          title: 'Text',
          group: 'text',
          category: 'text',
          blockSchema: {
            title: 'Text',
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['plaintext'],
              },
            ],
            properties: {
              plaintext: {
                title: 'Plain text',
                type: 'string',
                default: '',
              },
            },
            required: [],
          },
        },
        image: {
          id: 'image',
          title: 'Image',
          group: 'media',
          category: 'media',
          blockSchema: () => ({
            title: 'Image',
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['url', 'alt'],
              },
            ],
            properties: {
              url: {
                title: 'Image URL',
                type: 'string',
              },
              alt: {
                title: 'Alternative text',
                type: 'string',
                default: '',
              },
            },
            required: ['url'],
          }),
          blockWidth: {
            defaultWidth: 'default',
            widths: ['layout', 'default'],
          },
        },
        video: {
          id: 'video',
          title: 'Video',
          group: 'media',
          category: 'media',
        },
      },
    },
  },
}));

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
      scopes: [
        'site.read',
        'content.read',
        'content.search',
        'content.write',
        'schema.read',
        'blocks.read',
      ],
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
    createApproval: createApprovalMock,
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
    appendEvent: vi.fn(),
  }),
}));

describe('mcp tool route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    createApprovalMock.mockClear();
  });

  function createContext() {
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      getSite: vi.fn().mockResolvedValue({
        data: {
          '@id': 'http://localhost:8080/Plone',
          'plone.site_title': 'Plone',
          'plone.default_language': 'en',
        },
      }),
      getContent: vi.fn().mockResolvedValue({
        data: {
          '@id': 'http://localhost:8080/Plone/news/item',
          '@type': 'News Item',
          UID: 'uid-1',
          title: 'Item',
          description: 'Item description',
          modified: '2026-05-01T10:00:00Z',
          language: 'en',
          review_state: 'private',
          blocks: {
            __somersault__: {
              '@type': '__somersault__',
              value: [
                {
                  type: 'p',
                  children: [{ text: 'Intro paragraph' }],
                },
              ],
            },
            teaser1: {
              '@type': 'teaser',
              headline: 'Teaser headline',
            },
          },
          blocks_layout: {
            items: ['teaser1'],
          },
        },
      }),
      getType: vi.fn().mockResolvedValue({
        data: {
          title: 'News Item',
          type: 'News Item',
          required: ['title'],
          layouts: [],
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
              fields: ['title', 'description'],
            },
          ],
          properties: {
            title: {
              behavior: '',
              description: 'The title',
              factory: 'Text line (String)',
              title: 'Title',
              type: 'string',
            },
            description: {
              behavior: '',
              description: 'The description',
              factory: 'Text',
              title: 'Description',
              type: 'string',
              default: '',
            },
          },
        },
      }),
      search: vi.fn().mockResolvedValue({
        data: {
          items_total: 1,
          items: [
            {
              '@id': 'http://localhost:8080/Plone/news/item',
              '@type': 'News Item',
              UID: 'uid-1',
              title: 'Item',
              description: 'Item description',
              review_state: 'private',
              modified: '2026-05-01T10:00:00Z',
            },
          ],
        },
      }),
    } as any);
    return context;
  }

  it('executes site.get_context for a valid MCP session bearer token', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();

    const request = new Request(
      'http://example.com/@mcp/tools/site.get_context',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const response = await action({
      request,
      params: { '*': 'site.get_context' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      site: {
        id: 'http://localhost:8080/Plone',
        title: 'Plone',
        language: 'en',
      },
      user: {
        id: 'admin',
        fullname: 'Administrator',
        isAuthenticated: true,
      },
      session: {
        conversationId: 'conv_1',
        sessionId: 'mcp_1',
        scopes: [
          'site.read',
          'content.read',
          'content.search',
          'content.write',
          'schema.read',
          'blocks.read',
        ],
        approvalPolicy: 'standard_editor',
        status: 'active',
      },
      capabilities: {
        canReadContent: true,
        canSearchContent: true,
        canCreateContent: true,
        canUpdateContent: true,
        canApplyWorkflow: false,
      },
    });
  });

  it('executes content.get with a path identifier', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request('http://example.com/@mcp/tools/content.get', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: {
          path: '/news/item',
        },
      }),
    });

    const response = await action({
      request,
      params: { '*': 'content.get' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      item: {
        id: '/news/item',
        uid: 'uid-1',
        path: '/news/item',
        type: 'News Item',
        title: 'Item',
        description: 'Item description',
        language: 'en',
        reviewState: 'private',
        modified: '2026-05-01T10:00:00Z',
      },
      fields: {
        title: 'Item',
        description: 'Item description',
      },
    });
  });

  it('executes content.search with constrained query input', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request(
      'http://example.com/@mcp/tools/content.search',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            query: 'Item',
            path: '/news',
            types: ['News Item'],
            reviewState: ['private'],
            language: 'en',
            sort: 'modified_desc',
            limit: 5,
          },
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'content.search' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      results: [
        {
          uid: 'uid-1',
          path: '/news/item',
          title: 'Item',
          description: 'Item description',
          type: 'News Item',
          reviewState: 'private',
          modified: '2026-05-01T10:00:00Z',
        },
      ],
      total: 1,
      limit: 5,
    });
  });

  it('executes schema.get_type for a content type id', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search', 'schema.read'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request(
      'http://example.com/@mcp/tools/schema.get_type',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'News Item',
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'schema.get_type' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      type: {
        id: 'News Item',
        title: 'News Item',
      },
      schema: {
        required: ['title'],
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            description: null,
            fields: ['title', 'description'],
          },
        ],
        fields: {
          title: {
            type: 'string',
            title: 'Title',
            description: 'The title',
            required: true,
          },
          description: {
            type: 'string',
            title: 'Description',
            description: 'The description',
            required: false,
            default: '',
          },
        },
      },
    });
  });

  it('executes content.get_blocks with normalized block storage output', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request(
      'http://example.com/@mcp/tools/content.get_blocks',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: {
            path: '/news/item',
          },
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'content.get_blocks' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      item: {
        id: '/news/item',
        uid: 'uid-1',
        path: '/news/item',
        type: 'News Item',
        title: 'Item',
        reviewState: 'private',
        modified: '2026-05-01T10:00:00Z',
      },
      blocks: {
        storage: {
          blocks: {
            __somersault__: {
              '@type': '__somersault__',
              value: [
                {
                  type: 'p',
                  children: [{ text: 'Intro paragraph' }],
                },
              ],
            },
            teaser1: {
              '@type': 'teaser',
              headline: 'Teaser headline',
            },
          },
          blocksLayout: {
            items: ['teaser1'],
          },
        },
        somersault: {
          present: true,
          value: [
            {
              type: 'p',
              children: [{ text: 'Intro paragraph' }],
            },
          ],
        },
        summary: {
          blockCount: 2,
          blockTypes: ['__somersault__', 'teaser'],
          hasSomersaultBlock: true,
        },
      },
    });
  });

  it('creates an approval request for content.update instead of mutating directly', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search', 'content.write'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request(
      'http://example.com/@mcp/tools/content.update',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: {
            path: '/news/item',
          },
          changes: {
            title: 'Updated title',
          },
          reason: 'User requested a better headline',
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'content.update' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(202);
    expect(createApprovalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        conversationId: 'conv_1',
        sessionId: 'mcp_1',
        toolName: 'content.update',
        summary: 'Update title on /news/item',
        payload: {
          path: '/news/item',
          changes: {
            title: 'Updated title',
          },
          reason: 'User requested a better headline',
        },
      }),
    );
    expect((response as any).data).toEqual({
      error: {
        code: 'approval_required',
        message: 'content.update requires approval before execution',
        retryable: false,
      },
      approval: expect.objectContaining({
        id: 'apr_1',
        toolName: 'content.update',
        decision: 'pending',
      }),
    });
  });

  it('executes blocks.get_registry from the effective runtime registry', async () => {
    const { token } = issueMCPSessionToken({
      iss: 'http://example.com',
      sub: 'admin',
      sid: 'mcp_1',
      cid: 'conv_1',
      site: 'http://localhost:8080/Plone',
      scp: ['site.read', 'content.read', 'content.search', 'blocks.read'],
      apl: 'standard_editor',
      jti: 'jti_1',
      ttlMs: 60_000,
    });

    const context = createContext();
    const request = new Request(
      'http://example.com/@mcp/tools/blocks.get_registry',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blockIds: ['image', 'video'],
        }),
      },
    );

    const response = await action({
      request,
      params: { '*': 'blocks.get_registry' },
      context,
      unstable_pattern: '/@mcp/tools/*',
      unstable_url: new URL(request.url),
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      blocks: [
        {
          id: 'image',
          title: 'Image',
          group: 'media',
          category: 'media',
          schema: {
            title: 'Image',
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['url', 'alt'],
              },
            ],
            properties: {
              url: {
                title: 'Image URL',
                type: 'string',
              },
              alt: {
                title: 'Alternative text',
                type: 'string',
                default: '',
              },
            },
            required: ['url'],
          },
          defaults: {
            alt: '',
          },
          required: ['url'],
          blockWidth: {
            defaultWidth: 'default',
            widths: ['layout', 'default'],
          },
        },
        {
          id: 'video',
          title: 'Video',
          group: 'media',
          category: 'media',
          schema: null,
          defaults: {},
          required: [],
          blockWidth: null,
        },
      ],
    });
  });
});
