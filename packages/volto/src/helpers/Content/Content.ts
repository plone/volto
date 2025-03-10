/**
 * Content helper.
 * @module helpers/Content
 */

import omitBy from 'lodash/omitBy';
import mapKeys from 'lodash/mapKeys';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import keys from 'lodash/keys';
import endsWith from 'lodash/endsWith';
import find from 'lodash/find';
import config from '@plone/registry';
import {
  Content,
  BlocksFormData,
  Image,
  RelatedItem,
} from '@plone/types';

interface nestContentProps {
  '@static_behaviors'?: string[] | undefined;
  '@type'?: string | undefined;
  allow_discussion?: boolean | { title: string; token: boolean } | undefined;
  blocks?: {
    [k in string]: BlocksFormData;
  } | undefined;
  contributors?: string[] | undefined;
  creators?: string[] | undefined;
  description?: string | undefined;
  effective?: string | undefined;
  exclude_from_nav?: boolean | undefined;
  expires?: string | undefined;
  id?: string | undefined;
  language?: string | undefined;
  parent?: { '@id': string; '@type': string; description: string } | undefined;
  preview_caption?: string | undefined;
  preview_image?: Image | undefined;
  relatedItems?: RelatedItem[] | undefined;
  rights?: string | undefined;
  subjects?: [] | undefined;
  title?: string | undefined;
  versioning_enabled?: boolean | undefined;
}

interface languageProps {
  properties: {
    [key: string]: {
      multilingual_options?: {
        language_independent?: boolean;
      };
    };
  }
}
/**
 * Nest content.
 * @function nestContent
 * @param {Object} props Properties.
 * @return {string} Field name of the block
 */

export function nestContent(props: nestContentProps): nestContentProps {
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
export function getLayoutFieldname(props: Content): string {
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
export function getContentIcon(type: string, isFolderish: boolean): Object {
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

export function getLanguageIndependentFields(schema: languageProps): any[] {
  const { properties } = schema;
  return Object.keys(properties).filter(
    (field) =>
      Object.keys(properties[field]).includes('multilingual_options') &&
      properties[field]['multilingual_options']?.['language_independent'],
  );
}
