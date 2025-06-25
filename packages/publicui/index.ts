import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/publicui/routes/index.tsx',
    children: [
      {
        type: 'route',
        path: 'sitemap',
        file: '@plone/publicui/routes/sitemap.tsx',
      },
      {
        type: 'route',
        path: '*',
        file: '@plone/publicui/routes/content.tsx',
        options: {
          id: 'content',
        },
      },
    ],
  });

  return config;
}
