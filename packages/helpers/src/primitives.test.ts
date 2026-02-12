import { describe, expect, it, afterEach } from 'vitest';
import { isEmpty } from './primitives';

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
    const arr = [];
    const result = isEmpty(arr);
    expect(result).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    const obj = { key: 'value' };
    const result = isEmpty(obj);
    expect(result).toBe(false);
  });

  it('should return false for a non-empty array', () => {
    const arr = [1, 2, 3];
    const result = isEmpty(arr);
    expect(result).toBe(false);
  });
});
