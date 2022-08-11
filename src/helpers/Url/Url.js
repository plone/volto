/**
 * Url helper.
 * @module helpers/Url
 */

import { last, memoize } from 'lodash';
import { urlRegex, telRegex, mailRegex } from './urlRegex';
import prependHttp from 'prepend-http';
import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export const getBaseUrl = memoize((url) => {
  const { settings } = config;
  if (url === undefined) return;

  // We allow settings.nonContentRoutes to have strings (that are supposed to match
  // ending strings of pathnames, so we are converting them to RegEx to match also
  const normalized_nonContentRoutes = settings.nonContentRoutes.map((item) => {
    if (item.test) {
      return item;
    } else {
      return new RegExp(item + '$');
    }
  });

  let adjustedUrl = normalized_nonContentRoutes.reduce(
    (acc, item) => acc.replace(item, ''),
    url,
  );

  adjustedUrl = adjustedUrl || '/';
  return adjustedUrl === '/' ? '' : adjustedUrl;
});

/**
 * Get parent url.
 * @function getParentUrl
 * @param {string} url Url to be parsed.
 * @return {string} Parent url of content object.
 */
export const getParentUrl = memoize((url) => {
  return url.substring(0, url.lastIndexOf('/'));
});

/**
 * Get id from url.
 * @function getId
 * @param {string} url Url to be parsed.
 * @return {string} Id of content object.
 */
export function getId(url) {
  return last(url.replace(/\?.*$/, '').split('/'));
}

/**
 * Get view of an url.
 * @function getView
 * @param {string} url Url to be parsed.
 * @return {string} View of content object.
 */
export function getView(url) {
  const view = last(url.replace(/\?.*$/, '').split('/'));
  if (
    [
      'add',
      'layout',
      'contents',
      'edit',
      'delete',
      'diff',
      'history',
      'sharing',
      'controlpanel',
    ].indexOf(view) === -1
  ) {
    return 'view';
  }
  return view === 'layout' ? 'edit' : view;
}

/**
 * Flatten to app server URL - Given a URL if it starts with the API server URL
 * this method flattens it (removes) the server part
 * TODO: Update it when implementing non-root based app location (on a
 * directory other than /, eg. /myapp)
 * @method flattenToAppURL
 * @param {string} url URL of the object
 * @returns {string} Flattened URL to the app server
 */
export function flattenToAppURL(url) {
  const { settings } = config;
  return (
    url &&
    url
      .replace(settings.internalApiPath, '')
      .replace(settings.apiPath, '')
      .replace(settings.publicURL, '')
  );
}
/**
 * Given a URL it remove the querystring from the URL.
 * @method stripQuerystring
 * @param {string} url URL of the object
 * @returns {string} URL without querystring
 */
export function stripQuerystring(url) {
  return url.replace(/\?.*$/, '');
}

/**
 * Given a URL if it starts with the API server URL
 * this method removes the /api or the /Plone part.
 * @method toPublicURL
 * @param {string} url URL of the object
 * @returns {string} public URL
 */
export function toPublicURL(url) {
  const { settings } = config;
  return settings.publicURL.concat(flattenToAppURL(url));
}

/**
 * Returns true if the current view is a cms ui view
 * @method isCmsUi
 * @param {string} currentPathname pathname of the current view
 * @returns {boolean} true if the current view is a cms ui view
 */
export const isCmsUi = memoize((currentPathname) => {
  const { settings } = config;
  const fullPath = currentPathname.replace(/\?.*$/, '');
  // WARNING:
  // not working properly for paths like /editors or similar
  // because the regexp test does not take that into account
  // https://github.com/plone/volto/issues/870
  return settings.nonContentRoutes.reduce(
    (acc, route) => acc || new RegExp(route).test(`/${fullPath}`),
    false,
  );
});

/**
 * Flatten to app server HTML - Given a text if it contains some urls that starts
 * with the API server URL this method flattens it (removes) the server part.
 * TODO: Update it when implementing non-root based app location (on a
 * directory other than /, eg. /myapp)
 * @method flattenHTMLToAppURL
 * @param {string} html Some html snippet
 * @returns {string} Same HTML with Flattened URLs to the app server
 */
export function flattenHTMLToAppURL(html) {
  const { settings } = config;
  const replacer = config.settings.prefixPath ?? '';
  return settings.internalApiPath
    ? html
        .replace(new RegExp(settings.internalApiPath, 'g'), replacer)
        .replace(new RegExp(settings.apiPath, 'g'), replacer)
    : html.replace(new RegExp(settings.apiPath, 'g'), replacer);
}

export function addPrefixPath(src) {
  let url = src;
  const { prefixPath } = config.settings;
  if (isInternalURL(src) && prefixPath && !src.startsWith(prefixPath)) {
    url = prefixPath + src; //add prefixPath to src if it's an internal url and not a static resource.
  }
  return url;
}

/**
 * Add the app url
 * @method addAppURL
 * @param {string} url URL of the object
 * @returns {string} New URL with app
 */
export function addAppURL(url) {
  const { settings } = config;
  return url.indexOf(settings.apiPath) === 0
    ? url
    : `${settings.apiPath}${url}`;
}

/**
 * Given a URL expands it to the backend URL
 * Useful when you have to actually call the backend from the
 * frontend code (eg. ICS calendar download)
 * It is seamless mode aware
 * @method expandToBackendURL
 * @param {string} url URL or path of the object
 * @returns {string} New URL with the backend URL
 */
export function expandToBackendURL(path) {
  const { settings } = config;
  const APISUFIX = settings.legacyTraverse ? '' : '/++api++';
  let adjustedPath;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    // flattenToAppURL first if we get a full URL
    adjustedPath = flattenToAppURL(path);
  } else {
    // Next adds a / in front if not a full URL to make sure it's a valid relative path
    adjustedPath = path[0] !== '/' ? `/${path}` : path;
  }

  let apiPath = '';
  if (settings.internalApiPath && __SERVER__) {
    apiPath = settings.internalApiPath;
  } else if (settings.apiPath) {
    apiPath = settings.apiPath;
  }

  return `${apiPath}${APISUFIX}${adjustedPath}`;
}

/**
 * Check if internal url
 * @method isInternalURL
 * @param {string} url URL of the object
 * @returns {boolean} True if internal url
 */
export function isInternalURL(url) {
  const { settings } = config;

  const isMatch = (config.settings.externalRoutes ?? []).find((route) => {
    if (typeof route === 'object') {
      return matchPath(flattenToAppURL(url), route.match);
    }
    return matchPath(flattenToAppURL(url), route);
  });

  const isExcluded = isMatch && Object.keys(isMatch)?.length > 0;

  const internalURL =
    url &&
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

/**
 * Check if it's a valid url
 * @method isUrl
 * @param {string} url URL of the object
 * @returns {boolean} True if is a valid url
 */
export function isUrl(url) {
  return urlRegex().test(url);
}

/**
 * Normalize URL, adds protocol (if required eg. user has not entered the protocol)
 * @method normalizeUrl
 * @param {string} url URL of the object
 * @returns {boolean} URL with the protocol
 */
export function normalizeUrl(url) {
  return prependHttp(url);
}

/**
 * Removes protocol from URL (for display)
 * @method removeProtocol
 * @param {string} url URL of the object
 * @returns {string} URL without the protocol part
 */
export function removeProtocol(url) {
  return url.replace('https://', '').replace('http://', '');
}

export function isMail(text) {
  return mailRegex().test(text);
}

export function isTelephone(text) {
  return telRegex().test(text);
}

export function normaliseMail(email) {
  if (email?.toLowerCase()?.startsWith('mailto:')) {
    return email;
  }
  return `mailto:${email}`;
}

export function normalizeTelephone(tel) {
  if (tel?.toLowerCase()?.startsWith('tel:')) {
    return tel;
  }
  return `tel:${tel}`;
}

export function checkAndNormalizeUrl(url) {
  let res = {
    isMail: false,
    isTelephone: false,
    url: url,
    isValid: true,
  };
  if (URLUtils.isMail(URLUtils.normaliseMail(url))) {
    //Mail
    res.isMail = true;
    res.url = URLUtils.normaliseMail(url);
  } else if (URLUtils.isTelephone(url)) {
    //Phone
    res.isTelephone = true;
    res.url = URLUtils.normalizeTelephone(url);
  } else {
    //url
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
