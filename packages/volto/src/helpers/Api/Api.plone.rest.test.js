import config from '@plone/volto/registry';
import Api from './Api';
import { vi } from 'vitest';

vi.mock('superagent', () => ({
  default: {
    get: vi.fn((url) => ({
      url,
      query: vi.fn(),
      set: vi.fn(),
      type: vi.fn(),
      send: vi.fn(),
      end: vi.fn(),
    })),
  },
}));

beforeAll(() => {
  config.settings.legacyTraverse = false;
});

const api = new Api();
const { settings } = config;
global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('get request', () => {});

describe('Api', () => {
  it('prefixes relative path', () => {
    const promise = api.get('');
    expect(promise.request.url).toBe(`${settings.apiPath}/++api++/`);
  });
  it('does not prefix absolute path', () => {
    const promise = api.get('/test');
    expect(promise.request.url).toBe(`${settings.apiPath}/++api++/test`);
  });
  it('does not change http URL provided as path', () => {
    const promise = api.get('http://example.com');
    expect(promise.request.url).toBe('http://example.com');
  });
  it('does not change https URL provided as path', () => {
    const promise = api.get('https://example.com');
    expect(promise.request.url).toBe('https://example.com');
  });
});
