import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/publicui/routes/index.tsx',
    children: [
      {
        type: 'index',
        file: '@plone/publicui/routes/content.tsx',
        options: {
          id: 'content-index',
        },
      },
      {
        type: 'route',
        path: 'sitemap',
        file: '@plone/publicui/routes/sitemap.tsx',
        // options: {
        //   id: 'tuesday',
        // },
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
