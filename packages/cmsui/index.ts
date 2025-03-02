import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  // Translation factory
  config.registerUtility({
    name: 'translation',
    type: 'factory',
    method: (id: string) => id,
  });

  config.registerRoute({
    type: 'index',
    file: '@plone/cmsui/routes/index.tsx',
  });

  config.registerRoute({
    type: 'route',
    path: '/login',
    file: '@plone/cmsui/routes/auth/login.tsx',
  });

  config.registerRoute({
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
  });

  return config;
}
