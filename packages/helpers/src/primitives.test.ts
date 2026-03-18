import { describe, expect, it, afterEach } from 'vitest';
import { isDeepEqual, isEmpty } from './primitives';

describe('primitives', () => {
  afterEach(() => {
    // Clean up any test data or state
  });

  it('should return true for an empty object', () => {
    const obj = {};
    const result = isEmpty(obj);
    expect(result).toBe(true);
  });

  it('should return true for an empty array', () => {
    const arr: unknown[] = [];
    const result = isEmpty(arr);
    expect(result).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    const obj = { key: 'value' };
    const result = isEmpty(obj);
    expect(result).toBe(false);
  });

  it('should return false for a non-empty array', () => {
    const arr: number[] = [1, 2, 3];
    const result = isEmpty(arr);
    expect(result).toBe(false);
  });

  it('should deep-compare equal nested values', () => {
    const left = {
      title: 'Image',
      data: { ids: [1, 2], flags: { published: true } },
    };
    const right = {
      title: 'Image',
      data: { ids: [1, 2], flags: { published: true } },
    };

    expect(isDeepEqual(left, right)).toBe(true);
  });

  it('should detect deep-compare differences', () => {
    const left = { data: { ids: [1, 2, 3] } };
    const right = { data: { ids: [1, 2, 4] } };

    expect(isDeepEqual(left, right)).toBe(false);
  });
});
