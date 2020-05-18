/**
 * Content helper.
 * @module helpers/Content
 */

import { omitBy, mapKeys, pickBy, map, keys, endsWith, find } from 'lodash';

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
