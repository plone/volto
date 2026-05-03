import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/mcp/routes/layout.tsx',
    children: [
      {
        type: 'prefix',
        path: '@@mcp',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/mcp/routes/playground.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: '@@mcp-chat',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/mcp/routes/chat-page.tsx',
          },
        ],
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@mcp/session',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/mcp/routes/session.server.ts',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@mcp/tools',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/mcp/routes/tool.server.ts',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@mcp/approvals',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/mcp/routes/approval.server.ts',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@mcp/conversations',
    children: [
      {
        type: 'index',
        file: '@plone/mcp/routes/conversation.server.ts',
        options: {
          id: 'mcp-conversations-index',
        },
      },
      {
        type: 'route',
        path: ':id',
        file: '@plone/mcp/routes/conversation.server.ts',
        options: {
          id: 'mcp-conversations-detail',
        },
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@mcp/chat',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/mcp/routes/chat.server.ts',
      },
    ],
  });

  return config;
}
