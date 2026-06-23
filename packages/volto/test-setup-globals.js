import { vi } from 'vitest';
import '@testing-library/jest-dom';

global.__CLIENT__ = true;
global.__DEVELOPMENT__ = false;
global.__SERVER__ = false;
global.__TEST__ = true;

window.matchMedia =
  window.matchMedia ||
  function (query) {
    return {
      matches: query === '(min-width: 1024px)',
      addListener: function () {},
      removeListener: function () {},
    };
  };

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    }),
  ),
);

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

vi.stubGlobal('sessionStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

global.jest = {
  fn: vi.fn.bind(vi),
};

// Mock IntersectionObserver for Vitest
const IntersectionObserverMock = vi.fn((callback, options = {}) => {
  const instance = {
    thresholds: Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0],
    root: options.root ?? null,
    rootMargin: options.rootMargin ?? '',
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
  };

  return instance;
});

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
global.IntersectionObserver = IntersectionObserverMock;
window.IntersectionObserver = IntersectionObserverMock;
