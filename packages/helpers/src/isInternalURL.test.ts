import { describe, expect, test } from 'vitest';
import { isInternalURL } from './isInternalURL';

describe('isInternalURL', () => {
  test('returns false for empty/undefined input', () => {
    expect(isInternalURL()).toBe(false);
    expect(isInternalURL('')).toBe(false);
  });

  test('returns true for root-relative URLs', () => {
    expect(isInternalURL('/page')).toBe(true);
    expect(isInternalURL('/some/path')).toBe(true);
  });

  test('returns true for relative URLs starting with dot', () => {
    expect(isInternalURL('./page')).toBe(true);
    expect(isInternalURL('../page')).toBe(true);
  });

  test('returns true for anchor URLs', () => {
    expect(isInternalURL('#section')).toBe(true);
  });

  test('returns false for external URLs', () => {
    expect(isInternalURL('https://external.com')).toBe(false);
    expect(isInternalURL('https://google.com/search')).toBe(false);
  });
});
