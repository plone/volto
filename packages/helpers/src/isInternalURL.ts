import config from '@plone/registry';

/**
 * Lightweight check to detect if a URL points to the current Plone instance.
 * For absolute URLs, compares origins to avoid prefix-matching attacks
 */
export function isInternalURL(url?: string): boolean {
  if (!url) return false;

  if (url.startsWith('/') || url.startsWith('.') || url.startsWith('#')) {
    return true;
  }

  const settings = config.settings ?? ({} as Record<string, string>);
  const apiPath = settings.apiPath as string | undefined;

  if (apiPath) {
    try {
      const urlOrigin = new URL(url).origin;
      const apiOrigin = new URL(apiPath).origin;
      return urlOrigin === apiOrigin;
    } catch {
      return false;
    }
  }

  return false;
}
