/**
 * Url helper.
 * @module helpers/Url
 */

import { last } from 'lodash';

/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export function getBaseUrl(url) {
  return url
          .replace(/\?.*$/, '')
          .replace('/add', '')
          .replace('/delete', '')
          .replace('/edit', '')
          .replace('/login', '')
          .replace('/logout', '')
          .replace('/search', '');
}

/**
 * Get view of an url.
 * @function getView
 * @param {string} url Url to be parsed.
 * @return {string} View of content object.
 */
export function getView(url) {
  const view = last(url.replace(/\?.*$/, '').split('/'));
  if (['add', 'edit', 'delete'].indexOf(view) === -1) {
    return 'view';
  }
  return view;
}
