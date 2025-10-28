import config from '@plone/registry';

/**
 * Lightweight check to detect if a URL points to the current Plone instance.
 */
export function isInternalURL(url?: string): boolean {
  if (!url) return false;

  const settings = config.settings ?? ({} as Record<string, string>);
  const prefixes = [
    settings.publicURL,
    settings.internalApiPath,
    settings.apiPath,
  ];

  return (
    prefixes.some((prefix) => prefix && url.startsWith(prefix as string)) ||
    url.startsWith('/') ||
    url.startsWith('.') ||
    url.startsWith('#')
  );
}
