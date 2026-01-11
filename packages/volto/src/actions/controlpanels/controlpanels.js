/**
 * Controlpanels actions.
 * @module actions/controlpanels/controlpanels
 */

import {
  GET_CONTROLPANEL,
  POST_CONTROLPANEL,
  DELETE_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
  SYSTEM_INFORMATION,
  DATABASE_INFORMATION,
} from '@plone/volto/constants/ActionTypes';
import { getSite } from '@plone/volto/actions/site/site';

/**
 * Get controlpanel function.
 * @function getControlpanel
 * @param {id} id Controlpanel id.
 * @returns {Object} Get controlpanel action.
 */
export function getControlpanel(id) {
  return {
    type: GET_CONTROLPANEL,
    request: {
      op: 'get',
      path: `/@controlpanels/${id}`,
    },
  };
}

/**
 * Post controlpanel function.
 * @function postControlpanel
 * @param {id} id Controlpanel id.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Post controlpanel action.
 */
export function postControlpanel(id, data) {
  return {
    type: POST_CONTROLPANEL,
    request: {
      op: 'post',
      path: `/@controlpanels/${id}`,
      data,
    },
  };
}

/**
 * Delete controlpanel function.
 * @function deleteControlpanel
 * @param {id} id Controlpanel id.
 * @param {string} item Controlpanel item to be deleted.
 * @returns {Object} Delete controlpanel action.
 */
export function deleteControlpanel(id, item) {
  return {
    type: DELETE_CONTROLPANEL,
    request: {
      op: 'del',
      path: `/@controlpanels/${id}/${item}`,
    },
  };
}

/**
 * List controlpanels function.
 * @function listControlpanels
 * @returns {Object} List controlpanels action.
 */
export function listControlpanels() {
  return {
    type: LIST_CONTROLPANELS,
    request: {
      op: 'get',
      path: '/@controlpanels',
    },
  };
}

/**
 * Update controlpanel function.
 * @function updateControlpanel
 * @param {string} url Controlpanel url.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Update controlpanel action.
 */
export function updateControlpanel(url, data) {
  return (dispatch) => {
    const normalizedData = { ...data };
    if (
      url.includes('@controlpanels/language') &&
      normalizedData.default_language &&
      Array.isArray(normalizedData.available_languages)
    ) {
      const defaultLangCode =
        typeof normalizedData.default_language === 'string'
          ? normalizedData.default_language
          : normalizedData.default_language?.token ||
            normalizedData.default_language?.value;
      const isDefaultInAvailable = normalizedData.available_languages.some(
        (lang) => {
          const langCode =
            typeof lang === 'string' ? lang : lang?.token || lang?.value;
          return langCode === defaultLangCode;
        },
      );

      if (!isDefaultInAvailable && defaultLangCode) {
        // Preserve the existing format (string vs object) when appending
        const firstItem = normalizedData.available_languages[0];
        const isObjectFormat =
          firstItem && typeof firstItem === 'object' && firstItem !== null;

        const newLangEntry = isObjectFormat
          ? { token: defaultLangCode }
          : defaultLangCode;

        normalizedData.available_languages = [
          ...normalizedData.available_languages,
          newLangEntry,
        ];
      }
    }

    dispatch({
      type: UPDATE_CONTROLPANEL,
      request: {
        op: 'patch',
        path: url,
        data: normalizedData,
      },
    }).then(() => {
      dispatch(getSite());
    });
  };
}

export function getSystemInformation() {
  return {
    type: SYSTEM_INFORMATION,
    request: {
      op: 'get',
      path: '/@system',
    },
  };
}

export function getDatabaseInformation() {
  return {
    type: DATABASE_INFORMATION,
    request: {
      op: 'get',
      path: '/@database',
    },
  };
}
