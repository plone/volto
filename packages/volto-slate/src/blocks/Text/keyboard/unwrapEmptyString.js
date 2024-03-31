import { Node } from 'slate';
import {
  _unwrapElement,
  _getActiveElement,
} from '@plone/volto-slate/elementEditor/utils';
import config from '@plone/volto/registry';

/**
 * Handles empty string cases in the given `editor`.
 * It will unwrap empty strings for any major type (ex: a, mentions, footnote, zotero).
 * @param {Editor} editor
 * @param {Event} event
 */
export function unwrapEmptyString(props) {
  const { nodeTypesToHighlight } = config.settings.slate;
  const uniqueNodeTypesToHighligh = [...new Set(nodeTypesToHighlight)];
  const getActiveElement = _getActiveElement(uniqueNodeTypesToHighligh);
  const unwrapElement = _unwrapElement(uniqueNodeTypesToHighligh);

  const { editor } = props;
  const actEl = getActiveElement(editor);

  if (actEl && Node.string(actEl[0]).length === 1) {
    unwrapElement(editor);
  }
}
