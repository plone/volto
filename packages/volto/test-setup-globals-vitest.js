import '@testing-library/jest-dom';
import { expect, describe, it, vi } from 'vitest';

global.describe = describe;
global.it = it;
global.expect = expect;
global.vi = vi;

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
