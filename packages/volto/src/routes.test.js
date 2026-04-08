import config from './registry';
import { getExternalRoutes } from './routes';

describe('externalRoutes', () => {
  it('computes regular externalRoutes correctly', () => {
    config.settings.externalRoutes = [
      {
        match: {
          path: '/test',
        },
      },
    ];
    const testRoute = getExternalRoutes().find((r) => r.path === '/test');
    expect(testRoute).not.toBeUndefined();
  });
  it('computes shorthand externalRoutes correctly', () => {
    config.settings.externalRoutes = [{ match: '/test' }];
    const testRoute = getExternalRoutes().find((r) => r.path === '/test');
    expect(testRoute).not.toBeUndefined();
  });
  it('ignores invalid routes', () => {
    config.settings.externalRoutes = [
      '/test',
      { '/test': true },
      ['/test'],
      { match: ['/test'] },
      { match: 123 },
    ];
    const externalRoutes = getExternalRoutes();
    const testRoute = externalRoutes.find((r) => r.path === '/test');
    expect(testRoute).toBeUndefined();
    expect(externalRoutes.length).toEqual(0);
  });
});
