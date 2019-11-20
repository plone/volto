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
export const getBaseUrl = memoize(url => {
  let adjustedUrl = settings.nonContentRoutes.reduce(
    (acc, item) => acc.replace(item, ''),
    url,
  );

  adjustedUrl = adjustedUrl || '/';
  return adjustedUrl === '/' ? '' : adjustedUrl;
});

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
 * Returns true if the current view is a cms ui view
 * @method isCmsUi
 * @param {string} currentPathname pathname of the current view
 * @returns {boolean} true if the current view is a cms ui view
 */
export const isCmsUi = memoize(currentPathname => {
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
