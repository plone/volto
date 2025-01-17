import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { getAddonRoutesConfig } from './index';
import type { ReactRouterRouteEntry } from '@plone/types';

describe('getAddonRoutesConfig', () => {
  it('route - basic', () => {
    const routesConfig: Array<ReactRouterRouteEntry> = [
      {
        type: 'route',
        path: '/login',
        file: './login.tsx',
      },
    ];
    expect(getAddonRoutesConfig(routesConfig)).toEqual([
      { children: undefined, file: './login.tsx', path: '/login' },
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
    expect(getAddonRoutesConfig(routesConfig)).toEqual([
      { children: undefined, file: './login.tsx', path: '/login', id: 'login' },
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
    expect(getAddonRoutesConfig(routesConfig)).toEqual([
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
});
