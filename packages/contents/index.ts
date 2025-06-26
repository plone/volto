import type { ConfigType } from '@plone/registry';
import { contentIcons } from './config/ContentIcons';
export default function install(config: ConfigType) {
  config.settings.contentIcons = contentIcons;
  config.registerRoute({
    type: 'layout',
    file: '@plone/contents/routes/layout.tsx',
    children: [
      {
        type: 'prefix',
        path: '@@contents',
        children: [
          {
            path: '@@delete',
            type: 'route',
            file: '@plone/contents/routes/delete.tsx',
          },
          {
            path: '@@order',
            type: 'route',
            file: '@plone/contents/routes/order.tsx',
          },
          {
            path: '@@paste',
            type: 'route',
            file: '@plone/contents/routes/paste.tsx',
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
