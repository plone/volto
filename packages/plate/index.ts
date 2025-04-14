import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/plate/routes/layout.tsx',
    children: [
      {
        type: 'prefix',
        path: 'editor',
        children: [
          {
            type: 'index',
            file: '@plone/plate/routes/editor.tsx',
            options: {
              id: 'index-editor',
            },
          },
        ],
      },
    ],
  });

  return config;
}
