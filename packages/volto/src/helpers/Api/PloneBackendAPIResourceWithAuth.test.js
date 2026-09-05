import superagent from 'superagent';
import config from '@plone/volto/registry';
import { getPloneBackendAPIResourceWithAuth } from './PloneBackendAPIResourceWithAuth';

vi.mock('superagent', () => ({
  default: {
    get: vi.fn(() => ({
      maxResponseSize: vi.fn().mockReturnThis(),
      responseType: vi.fn().mockReturnThis(),
      set: vi.fn(),
      use: vi.fn(),
      then: vi.fn((resolve) => resolve()),
    })),
  },
}));

const request = {
  path: '/@portrait/admin',
  universalCookies: { get: vi.fn() },
  headers: {},
};

describe('getPloneBackendAPIResourceWithAuth', () => {
  const originalSettings = { ...config.settings };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('__DEVELOPMENT__', true);
    Object.assign(config.settings, originalSettings, {
      apiPath: 'http://localhost:3000',
      devProxyToApiPath: 'http://localhost:8080/Plone',
      internalApiPath: undefined,
      apiSuffix: undefined,
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
    Object.assign(config.settings, originalSettings);
  });

  it('uses the API traversal path for Plone in development', async () => {
    config.settings.legacyTraverse = false;

    await getPloneBackendAPIResourceWithAuth(request);

    expect(superagent.get).toHaveBeenCalledWith(
      'http://localhost:8080/Plone/++api++/@portrait/admin',
    );
  });

  it('omits the API traversal path for legacy backends in development', async () => {
    config.settings.legacyTraverse = true;

    await getPloneBackendAPIResourceWithAuth(request);

    expect(superagent.get).toHaveBeenCalledWith(
      'http://localhost:8080/Plone/@portrait/admin',
    );
  });

  it('uses apiSuffix in preference to legacyTraverse in development', async () => {
    config.settings.legacyTraverse = true;
    config.settings.apiSuffix = '/custom-api';

    await getPloneBackendAPIResourceWithAuth(request);

    expect(superagent.get).toHaveBeenCalledWith(
      'http://localhost:8080/Plone/custom-api/@portrait/admin',
    );
  });
});
