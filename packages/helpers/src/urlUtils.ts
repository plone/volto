import { matchPath } from 'react-router';
import config from '@plone/registry';

import validator from 'validator';

type ExternalRoute = string | { match: string };

interface Settings {
  publicURL: string;
  internalApiPath?: string;
  apiPath: string;
  externalRoutes?: ExternalRoute[];
}

export function isInternalURL(url: string): boolean {
  const { settings } = config as { settings: Settings };

  const isMatch = (settings.externalRoutes ?? []).find((route) => {
    if (typeof route === 'object') {
      return matchPath(url, route.match);
    }
    return matchPath(url, route);
  });

  const isExcluded = Boolean(isMatch && Object.keys(isMatch).length > 0);

  const internalURL =
    !!url &&
    (url.indexOf(settings.publicURL) !== -1 ||
      (settings.internalApiPath &&
        url.indexOf(settings.internalApiPath) !== -1) ||
      url.indexOf(settings.apiPath) !== -1 ||
      url.charAt(0) === '/' ||
      url.charAt(0) === '.' ||
      url.startsWith('#'));

  if (internalURL && isExcluded) {
    return false;
  }

  return internalURL;
}

export function removeProtocol(
  url: string,
  protocol: string = 'https://',
): string {
  return url
    .replace(protocol, '')
    .replace(protocol === 'https://' ? 'http://' : 'https://', '');
}

export function isMail(text: string): boolean {
  return validator.isEmail(text);
}

export function isTelephone(text: string): boolean {
  return validator.isMobilePhone(text, 'any'); // pode passar locale: 'it-IT', 'pt-BR', etc.
}

export function normaliseMail(email: string): string {
  if (email?.toLowerCase()?.startsWith('mailto:')) {
    return email;
  }
  return `mailto:${email}`;
}

export function normalizeTelephone(tel: string): string {
  if (tel?.toLowerCase()?.startsWith('tel:')) {
    return tel;
  }
  return `tel:${tel}`;
}

export function normalizeUrl(url: string): string {
  if (!url) return '';

  let candidate = url.trim();

  // If the URL does not start with a protocol, add 'https://'
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  // Validate the URL with validator.js
  if (!validator.isURL(candidate, { require_protocol: true })) {
    return ''; // Invalid URL, return empty string
  }

  // Use the URL constructor to normalize the URL
  return new URL(candidate).href;
}

export function isUrl(url: string): boolean {
  return validator.isURL(url, { require_protocol: true });
}

export function checkAndNormalizeUrl(url: string) {
  const res = {
    isMail: false,
    isTelephone: false,
    url: url,
    isValid: true,
  };

  if (URLUtils.isMail(URLUtils.normaliseMail(url))) {
    // Mail
    res.isMail = true;
    res.url = URLUtils.normaliseMail(url);
  } else if (URLUtils.isTelephone(url)) {
    // Phone
    res.isTelephone = true;
    res.url = URLUtils.normalizeTelephone(url);
  } else {
    // URL
    if (
      res.url?.length >= 0 &&
      !res.url.startsWith('/') &&
      !res.url.startsWith('#')
    ) {
      res.url = URLUtils.normalizeUrl(url);
      if (!URLUtils.isUrl(res.url)) {
        res.isValid = false;
      }
    }
    if (res.url === undefined || res.url === null) res.isValid = false;
  }
  return res;
}

export const URLUtils = {
  normalizeTelephone,
  normaliseMail,
  normalizeUrl,
  isTelephone,
  isMail,
  isUrl,
  checkAndNormalizeUrl,
};
