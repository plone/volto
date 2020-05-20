/**
 * Url helper.
 * @module helpers/Url
 */

import { last, memoize } from 'lodash';
import { settings } from '~/config';

/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export const getBaseUrl = memoize((url) => {
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
    ].indexOf(view) === -1
  ) {
    return 'view';
  }
  return view === 'layout' ? 'edit' : view;
}

/**
 * Get icon
 * @method getIcon
 * @param {string} type Type of the item.
 * @param {bool} isFolderish Is folderish.
 * @returns {string} Icon name.
 */
export function getIcon(type, isFolderish) {
  switch (type) {
    case 'Document':
      return 'file text outline';
    case 'Image':
      return 'file image outline';
    case 'File':
      return 'attach';
    case 'Link':
      return 'linkify';
    case 'Event':
      return 'calendar';
    default:
      return isFolderish ? 'folder open outline' : 'file outline';
  }
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
  return url.replace(settings.apiPath, '');
}

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
  return html.replace(new RegExp(settings.apiPath, 'g'), '');
}

/**
 * Add the app url
 * @method addAppURL
 * @param {string} url URL of the object
 * @returns {string} New URL with app
 */
export function addAppURL(url) {
  return `${settings.apiPath}${url}`;
}

/**
 * Check if internal url
 * @method isInternalURL
 * @param {string} url URL of the object
 * @returns {boolean} True if internal url
 */
export function isInternalURL(url) {
  return (
    url.indexOf(settings.apiPath) !== -1 ||
    url.charAt(0) === '/' ||
    url.startsWith('#')
  );
}
