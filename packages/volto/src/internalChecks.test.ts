import { describe, it, expect } from 'vitest';
import packageJson from '../package.json';

describe('internal checks', () => {
  it('keeps prettier listed as a runtime dependency', () => {
    const dependencies = packageJson.dependencies ?? {};

    expect(dependencies).toHaveProperty('prettier');
    expect(typeof dependencies.prettier).toBe('string');
  });
});
