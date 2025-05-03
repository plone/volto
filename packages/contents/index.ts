import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/contents/routes/layout.tsx',
    children: [
      {
        type: 'prefix',
        path: 'contents',
        children: [
          {
            type: 'index',
            file: '@plone/contents/routes/contents.tsx',
            options: {
              id: 'index-contents',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/contents/routes/contents.tsx',
          },
        ],
      },
    ],
  });

  return config;
}
