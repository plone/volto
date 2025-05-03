import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { getAddonRoutesConfig } from './index';
import type { ReactRouterRouteEntry } from '@plone/types';

describe('getAddonRoutesConfig', () => {
  const addonsInfo = [
    {
      name: '@plone/components',
      modulePath: '/my/path/to/plone/components',
    },
  ];

  it('route - basic', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'route',
        path: '/login',
        file: './login.tsx',
      },
    ];
    expect(getAddonRoutesConfig(routesConfig, addonsInfo)).toEqual([
      { children: undefined, file: './login.tsx', path: '/login' },
    ]);
  });

  it('route - basic with addon name', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'route',
        path: '/login',
        file: '@plone/components/login.tsx',
      },
    ];
    expect(getAddonRoutesConfig(routesConfig, addonsInfo)).toEqual([
      {
        children: undefined,
        file: '/my/path/to/plone/components/login.tsx',
        path: '/login',
      },
    ]);
  });

  it('route - with options', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'route',
        path: '/login',
        file: './login.tsx',
        options: {
          id: 'login',
        },
      },
    ];
    expect(getAddonRoutesConfig(routesConfig, addonsInfo)).toEqual([
      {
        children: undefined,
        file: './login.tsx',
        path: '/login',
        id: 'login',
      },
    ]);
  });

  it('route - nested', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'route',
        path: '/login',
        file: './login.tsx',
        children: [
          {
            type: 'route',
            path: '/login/ok',
            file: './login/ok.tsx',
          },
        ],
      },
    ];
    expect(getAddonRoutesConfig(routesConfig, addonsInfo)).toEqual([
      {
        file: './login.tsx',
        path: '/login',
        children: [
          {
            children: undefined,
            file: './login/ok.tsx',
            path: '/login/ok',
          },
        ],
      },
    ]);
  });

  it('route - prefix', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'prefix',
        path: 'edit',
        children: [
          {
            type: 'index',
            file: './index.tsx',
          },
          {
            type: 'route',
            path: '*',
            file: './edit.tsx',
          },
        ],
      },
    ];
    expect(getAddonRoutesConfig(routesConfig, addonsInfo)).toEqual([
      {
        children: undefined,
        path: 'edit',
        file: './index.tsx',
        index: true,
      },
      {
        children: undefined,
        path: 'edit/*',
        file: './edit.tsx',
      },
    ]);
  });
});
