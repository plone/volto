/**
 * Content helper.
 * @module helpers/Content
 */

import { omitBy, mapKeys, pickBy, map, keys, endsWith, find } from 'lodash';
import config from '@plone/volto/registry';

/**
 * Nest content.
 * @function nestContent
 * @param {Object} props Properties.
 * @return {string} Field name of the block
 */
export function nestContent(props) {
  if (!props['@static_behaviors']) {
    return props;
  }

  let nestedProps = props;

  map(props['@static_behaviors'], (behavior) => {
    const values = mapKeys(
      pickBy(nestedProps, (value, key) => key.indexOf(behavior) !== -1),
      (value, key) => key.replace(`${behavior}.`, ''),
    );
    nestedProps = omitBy(
      nestedProps,
      (value, key) => key.indexOf(behavior) !== -1,
    );
    nestedProps = {
      ...nestedProps,
      [behavior]: values,
    };
  });
  return nestedProps;
}

/**
 * Get layout field.
 * @function getLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the layout
 */
export function getLayoutFieldname(props) {
  return (
    find(keys(props), (key) => endsWith(key, 'content_layout')) || 'layout'
  );
}

/**
 * Get content icon.
 * @description Configurable in config
 * @function getContentIcon
 * @param {string} type Content type
 * @param {boolean} isFolderish
 * @returns {Object} Icon component
 */
export function getContentIcon(type, isFolderish) {
  const { settings } = config;
  const { contentIcons } = settings;

  if (type in contentIcons) return contentIcons[type];
  return isFolderish ? contentIcons.Folder : contentIcons.File;
}

/**
 * Get the language independent fields presents in a schema.
 * @description Configurable in config
 * @function getLanguageIndependentFields
 * @param {string} schema content type JSON Schema serialization
 * @returns {array} List of language independent fields
 */
export function getLanguageIndependentFields(schema) {
  const { properties } = schema;
  return Object.keys(properties).filter(
    (field) =>
      Object.keys(properties[field]).includes('multilingual_options') &&
      properties[field]['multilingual_options']?.['language_independent'],
  );
}
