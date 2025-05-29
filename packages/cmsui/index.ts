import type { ConfigType } from '@plone/registry';
import installWidgets from './config/widgets';

export default function install(config: ConfigType) {
  installWidgets(config);

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
        path: 'logout',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/auth/logout.tsx',
            options: {
              id: 'index-logout',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/auth/logout.tsx',
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
      {
        type: 'prefix',
        path: 'test-layout',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/test.tsx',
            options: {
              id: 'index-test',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/test.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'forbidden',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/forbidden.tsx',
            options: {
              id: 'index-forbidden',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/forbidden.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'unauthorized',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/unauthorized.tsx',
            options: {
              id: 'index-unauthorized',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/unauthorized.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'notfound',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/notfound.tsx',
            options: {
              id: 'index-notfound',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/notfound.tsx',
          },
        ],
      },
      {
        type: 'prefix',
        path: 'connection-refused',
        children: [
          {
            type: 'index',
            file: '@plone/cmsui/routes/connection-refused.tsx',
            options: {
              id: 'index-connection-refused',
            },
          },
          {
            type: 'route',
            path: '*',
            file: '@plone/cmsui/routes/connection-refused.tsx',
          },
        ],
      },
    ],
  });

  return config;
}
