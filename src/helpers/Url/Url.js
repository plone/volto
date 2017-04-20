/**
 * Url helper.
 * @module helpers/Url
 * @flow
 */

import { last } from 'lodash';

/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export function getBaseUrl(url: string): string {
  return url
    .replace(/\?.*$/, '')
    .replace('/add', '')
    .replace('/contents', '')
    .replace('/delete', '')
    .replace('/edit', '')
    .replace('/login', '')
    .replace('/logout', '')
    .replace('/sharing', '')
    .replace('/search', '');
}

/**
 * Get view of an url.
 * @function getView
 * @param {string} url Url to be parsed.
 * @return {string} View of content object.
 */
export function getView(url: string): string {
  const view = last(url.replace(/\?.*$/, '').split('/'));
  if (['add', 'contents', 'edit', 'delete', 'sharing'].indexOf(view) === -1) {
    return 'view';
  }
  return view;
}

/**
 * Get icon
 * @method getIcon
 * @param {string} type Type of the item.
 * @param {bool} isFolderish Is folderish.
 * @returns {string} Icon name.
 */
export function getIcon(type: string, isFolderish: boolean): string {
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
