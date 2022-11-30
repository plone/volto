import { Node, Range } from 'slate';
// import { ReactEditor } from 'slate-react';

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
      // we need to differentiate between multiple highlight types, the active
      // selection and the highlighted node
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
  // const focused = ReactEditor.isFocused(editor);
  // TODO: handle the case when the editor is not focused, then use the
  // editor.getSavedSelection()

  if (selected && editor.selection) {
    const selection = editor.selection;
    if (JSON.stringify(path) === JSON.stringify(selection.anchor.path)) {
      const range = {
        ...selection,
        highlight: true,
        highlightType: 'selection',
        isSelection: true,
      };
      if (Range.isExpanded(range)) {
        ranges.push(range);
      }
    }
  }
  return ranges;
}
