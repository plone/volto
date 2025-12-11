import { afterEach, describe, expect, it } from 'vitest';
import config from '@plone/registry';
import { isInternalURL } from './isInternalURL';

describe('isInternalURL', () => {
  afterEach(() => {
    config.settings = {};
  });

  it('returns true for URLs matching publicURL', () => {
    config.settings.publicURL = 'https://example.com';
    expect(isInternalURL('https://example.com/page')).toBe(true);
  });

  it('returns true for URLs matching internalApiPath', () => {
    config.settings.internalApiPath = 'http://backend';
    expect(isInternalURL('http://backend/endpoint')).toBe(true);
  });

  it('returns true for URLs matching apiPath', () => {
    config.settings.apiPath = 'http://api';
    expect(isInternalURL('http://api/content/1')).toBe(true);
  });

  it('returns true for relative paths and hashes', () => {
    expect(isInternalURL('/path')).toBe(true);
    expect(isInternalURL('./relative')).toBe(true);
    expect(isInternalURL('#anchor')).toBe(true);
  });

  it('returns false for external URLs', () => {
    config.settings.publicURL = 'https://example.com';
    expect(isInternalURL('https://othersite.com')).toBe(false);
  });

  it('returns false when URL is undefined or empty', () => {
    expect(isInternalURL()).toBe(false);
    expect(isInternalURL('')).toBe(false);
  });
});
