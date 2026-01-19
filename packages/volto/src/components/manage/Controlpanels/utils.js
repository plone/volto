/**
 * @module components/manage/Controlpanels/utils
 */

import { getControlpanel } from '@plone/volto/actions/controlpanels/controlpanels';
import last from 'lodash/last';

/**
 * @function fetchControlpanelSchemas
 * @param {Array<string>} ids
 * @param {Object} currentSchemas
 * @param {Function} dispatch
 * @returns {Promise<Object>}
 */

export async function fetchControlpanelSchemas(ids, currentSchemas, dispatch) {
  const idsToFetch = ids.filter((id) => !currentSchemas[id]);

  if (idsToFetch.length === 0) {
    return {};
  }

  const schemaPromises = idsToFetch.map(async (id) => {
    try {
      const result = await dispatch(getControlpanel(id));
      return { panelId: id, schema: result };
    } catch (error) {
      error.panelId = id;
      return { panelId: id, schema: null, error };
    }
  });

  const schemaResults = await Promise.allSettled(schemaPromises);

  const schemasObject = {};
  schemaResults.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { panelId, schema } = result.value;
      if (schema) {
        schemasObject[panelId] = schema;
      }
    }
  });

  return schemasObject;
}

/**
 * @function bfsSearchSchema
 * @param {Object} schema
 * @param {string} query
 * @param {string} schemaId
 * @returns {Array}
 */
function bfsSearchSchema(schema, query, schemaId) {
  if (
    !schema ||
    typeof schema !== 'object' ||
    !query ||
    query.trim().length < 2
  ) {
    return [];
  }

  const searchTerm = query.trim().toLowerCase();
  const queue = [];
  const matches = [];

  const rootKeys = Object.keys(schema);
  rootKeys.forEach((key) => {
    queue.push({
      key,
      value: schema[key],
      path: key,
    });
  });

  while (queue.length > 0) {
    const { key, value, path } = queue.shift();

    if (typeof value === 'string') {
      if (value.toLowerCase().includes(searchTerm)) {
        matches.push({
          id: `${schemaId}-${path}`,
          path,
          key,
          value,
          url: `/controlpanel/${schemaId}#${path}`,
          schemaId,
        });
      }
      continue;
    }

    if (value === null || value === undefined || typeof value !== 'object') {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === 'object') {
          const itemKeys = Object.keys(item);
          itemKeys.forEach((itemKey) => {
            queue.push({
              key: itemKey,
              value: item[itemKey],
              path: `${path}[${index}].${itemKey}`,
            });
          });
        } else if (typeof item === 'string') {
          if (item.toLowerCase().includes(searchTerm)) {
            matches.push({
              id: `${schemaId}-${path}[${index}]`,
              path: `${path}[${index}]`,
              key: `${path}[${index}]`,
              value: item,
              url: `/controlpanel/${schemaId}#${path}[${index}]`,
              schemaId,
            });
          }
        }
      });
      continue;
    }

    const objKeys = Object.keys(value);
    objKeys.forEach((objKey) => {
      queue.push({
        key: objKey,
        value: value[objKey],
        path: `${path}.${objKey}`,
      });
    });
  }

  return matches;
}

/**
 * @function searchSettings
 * @param {Array} controlpanels
 * @param {Object} schemas
 * @param {string} query
 * @returns {Array}
 */

export function searchSettings(controlpanels, schemas, query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const allMatches = [];

  for (const panel of controlpanels) {
    const panelId = last(panel['@id']?.split('/')) || panel.id;
    const schema = schemas[panelId];

    if (!schema) {
      continue;
    }

    const matches = bfsSearchSchema(schema, query, panelId);

    matches.forEach((match) => {
      allMatches.push({
        ...match,
        type: 'field',
        panelId,
      });
    });
  }

  return allMatches;
}
