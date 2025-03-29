import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'layout',
    file: '@plone/cmsui/routes/layout.tsx',
    children: [
      {
        type: 'prefix',
        path: 'login',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/auth/login.tsx',
            options: {
              id: 'index-login',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/auth/login.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'edit',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/edit.tsx',
            options: {
              id: 'index-edit',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/edit.tsx',
          },
        ],
      },
    ],
  });

  return config;
}
