/**
 * translations actions.
 * @module actions/translations/translations
 */

import {
  DELETE_TRANSLATION,
  GET_TRANSLATION_LOCATOR,
  LINK_TRANSLATION,
  GET_CONTENT_TRANSLATION,
  GET_CONTENT_TRANSLATION_SERVICES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get translations function.
 * @function getTranslationLocator
 * @param {string} url URL type.
 * @returns {Object} Get translations action.
 */
export function getTranslationLocator(url, lang) {
  return {
    type: GET_TRANSLATION_LOCATOR,
    request: {
      op: 'get',
      path: `${url}/@translation-locator?target_language=${lang}`,
    },
  };
}

/**
 * Link translations function.
 * @function linkTranslation
 * @param {string} url URL type origin object to be linked to.
 * @param {string} target URL type (absolute, relative or UUID).
 * @returns {Object} Get translations action.
 */
export function linkTranslation(url, target) {
  return {
    type: LINK_TRANSLATION,
    request: {
      op: 'post',
      path: `${url}/@translations`,
      data: {
        id: target,
      },
    },
  };
}

/**
 * Delete link translations function.
 * @function linkTranslation
 * @param {string} url URL type origin object to be linked to.
 * @param {string} lang short language code of the translation to be deleted.
 * @returns {Object} Get translations action.
 */
export function deleteLinkTranslation(url, lang) {
  return {
    type: DELETE_TRANSLATION,
    request: {
      op: 'del',
      path: `${url}/@translations`,
      data: {
        language: lang,
      },
    },
  };
}

/**
 * Get content translation services
 * @function getContentTranslationServices
 * @returns {Object} Get registered content translation services action
 */
export function getContentTranslationServices() {
  return {
    type: GET_CONTENT_TRANSLATION_SERVICES,
    request: {
      op: 'get',
      path: '/@translation-services',
    },
  };
}

/**
 * Get content translation
 * @function getContentTranslation
 * @param {string} source_language language code of the source string
 * @param {string} target_language language code of the desired translation
 * @param {string} original_text the text to be translated
 * @param {string} service. Optional. The name of the service that should be used to translate the text
 * @param {string} subrequest. Optional. Key of the subrequest.
 * @returns {Object} Get content translation action.
 */
export function getContentTranslation(
  source_language,
  target_language,
  original_text,
  service,
  subrequest,
) {
  return {
    type: GET_CONTENT_TRANSLATION,
    request: {
      op: 'post',
      path: '/@translate-text',
      data: {
        source_language: source_language,
        target_language: target_language,
        original_text: original_text,
        service: service,
      },
    },
    subrequest: subrequest,
  };
}
