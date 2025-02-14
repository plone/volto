import { nestContent } from '@plone/volto/helpers/Content/Content';
import { UPLOAD_CONTENT } from '@plone/volto-slate/constants';

// TODO: the PR has been merged into Volto, so this should be cleaned up

/**
 * @summary Upload content function.
 *
 * @description A custom version of Volto's `createContent` that can take an
 * `origin` block ID. There is an issue on making this a builtin variant of the
 * Volto's `createContent` action: https://github.com/plone/volto/issues/1654.
 *
 * @param {string} url Parent URL.
 * @param {Object|Array} content Content data.
 * @param {string} origin The ID of the block into which the content should be
 * uploaded.
 *
 * @todo Clarify if the parameter `origin` is optional or remove this TODO.
 *
 * @returns {Object} Upload content action.
 */
export function uploadContent(url, content, origin) {
  return {
    type: UPLOAD_CONTENT,
    origin,
    request: Array.isArray(content)
      ? content.map((item) => ({ op: 'post', path: url, data: item }))
      : { op: 'post', path: url, data: nestContent(content) },
  };
}
