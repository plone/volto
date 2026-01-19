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
 * @function searchSchemaFields
 * @param {Object} schema
 * @param {string} query
 * @param {string} schemaId
 * @returns {Array}
 */
function searchSchemaFields(schema, query, schemaId) {
  if (
    !schema ||
    typeof schema !== 'object' ||
    !query ||
    query.trim().length < 2
  ) {
    return [];
  }

  const actualSchema = schema.schema || schema;
  const searchTerm = query.trim().toLowerCase();
  const matches = [];
  const properties = actualSchema.properties || {};
  const fieldsets = actualSchema.fieldsets || [];

  fieldsets.forEach((fieldset) => {
    const fieldsetFeilds = fieldset.fields;

    fieldsetFeilds.forEach((fieldName) => {
      if (typeof fieldName !== 'string') {
        return;
      }

      const fieldNameLower = fieldName.toLowerCase();
      let isMatch = fieldNameLower.includes(searchTerm);

      const fieldProperty = properties[fieldName];
      let matchedValue = fieldName;

      if (fieldProperty) {
        const title = fieldProperty.title || '';
        const description = fieldProperty.description || '';

        if (title.toLowerCase().includes(searchTerm)) {
          isMatch = true;
          matchedValue = title;
        } else if (description.toLowerCase().includes(searchTerm)) {
          isMatch = true;
          matchedValue = description;
        } else if (isMatch) {
          matchedValue = title || fieldName;
        }
      }

      if (isMatch) {
        matches.push({
          id: `${schemaId}-${fieldName}`,
          title: fieldName.toUpperCase(),
          key: fieldName,
          value: matchedValue,
          url: `/controlpanel/${schemaId}#${fieldName}`,
          schemaId,
        });
      }
    });
  });

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

  const groupedMatches = {};

  for (const panel of controlpanels) {
    const panelId = last(panel['@id']?.split('/')) || panel.id;
    const schema = schemas[panelId];

    if (!schema) {
      continue;
    }

    const matches = searchSchemaFields(schema, query, panelId);

    if (matches.length > 0) {
      if (!groupedMatches[panelId]) {
        groupedMatches[panelId] = {
          title: panel.title || panelId,
          group: panel.group || '',
          panelId,
          url: `/controlpanel/${panelId}`,
          matches: [],
        };
      }

      matches.forEach((match) => {
        groupedMatches[panelId].matches.push({
          key: match.key,
          value: match.value,
          title: match.title,
          url: match.url,
        });
      });
    }
  }

  return Object.values(groupedMatches);
}
