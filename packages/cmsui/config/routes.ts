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
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/auth/login.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'logout',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/auth/logout.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: '@@add',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/add.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: '@@edit',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/edit.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'controlpanel',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/controlpanels.tsx',
            options: {
              id: 'index-controlpanel',
            },
          },
          {
            type: 'route',
            path: ':id',
            file: '@plone/cmsui/routes/controlpanel.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'test-layout',
        children: [
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/test.tsx',
          },
        ],
      },
    ],
  });

  config.registerRoute({
    type: 'prefix',
    path: '@search',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/cmsui/routes/search.tsx',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@breadcrumbs',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/cmsui/routes/breadcrumbs.tsx',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@objectBrowserWidget',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/cmsui/routes/objectBrowserWidget.tsx',
      },
    ],
  });
  config.registerRoute({
    type: 'prefix',
    path: '@createContent',
    children: [
      {
        type: 'route',
        path: '*',
        file: '@plone/cmsui/routes/api/createContent.tsx',
      },
    ],
  });

  return config;
}
