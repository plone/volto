import { generateRobots } from './Robots';

const request = {
  set: vi.fn(() => request),
  use: vi.fn(() => request),
  end: vi.fn(),
};

vi.mock('superagent', () => ({
  default: {
    get: vi.fn(() => request),
  },
}));

vi.mock('@plone/volto/helpers/Proxy/Proxy', () => ({
  addHeadersFactory: vi.fn(() => vi.fn()),
}));

describe('generateRobots', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves the original error when superagent does not provide a response', async () => {
    const error = new Error('network error');
    request.end.mockImplementationOnce((callback) => callback(error));

    await expect(
      generateRobots({
        universalCookies: { get: vi.fn(() => null) },
      }),
    ).resolves.toBe(error);
  });
});
