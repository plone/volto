import { Node, Range } from 'slate';

import config from '@plone/volto/registry';

/**
 * highlightByType.
 *
 * @param {} editor
 * @param {} node, path
 * @param {} ranges
 */
export const highlightByType = (editor, [node, path], ranges) => {
  const { slate } = config.settings;
  const { nodeTypesToHighlight } = slate;

  if (nodeTypesToHighlight.includes(node.type)) {
    const [found] = Node.texts(editor, { from: path, to: path });
    const visualSelectionRanges = highlightSelection(editor, found, ranges);
    const text = Node.string(node) || '';
    const range = {
      anchor: { path, offset: 0 },
      focus: { path, offset: text.length },
      highlight: true,
      highlightType: visualSelectionRanges.length === 0 ? node.type : null,
      isSelection: visualSelectionRanges.length > 0,
    };
    return [range];
  }

  return ranges;
};

/**
 * @function highlightSelection
 *
 * @summary A runtime decorator that decorates the saved selection, when the editor is
 * is no longer active.
 *
 * @param {Editor} editor The editor on which to apply the decorator.
 * @param {Node} node
 * @param {Path} path
 * @param {Array} ranges
 */
export function highlightSelection(editor, [node, path], ranges) {
  let selected = editor.isSelected();

  if (selected && !editor.selection && editor.getSavedSelection()) {
    const newSelection = editor.getSavedSelection();
    if (JSON.stringify(path) === JSON.stringify(newSelection.anchor.path)) {
      const range = {
        ...newSelection,
        highlight: true,
        isSelection: true,
      };
      if (Range.isExpanded(range)) {
        ranges.push(range);
      }
    }
  }
  // if (ranges.length) console.log('RANGES!', ranges, editor.children);
  // console.log(node, path, editor.savedSelection);
  return ranges;
}
