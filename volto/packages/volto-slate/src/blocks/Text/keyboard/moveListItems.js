import { Editor, Path, Transforms, Node } from 'slate';
import {
  isCursorInList,
  getCurrentListItem,
} from '@plone/volto-slate/utils/lists';
import config from '@plone/volto/registry';

/**
 * Move up a list with with `Ctrl+Up`. (The Up key is supposed here to be
 * pressed.)
 * @param {Editor} Editor
 * @param {KeyboardEvent} event
 */
export function moveListItemUp({ editor, event }) {
  // If Ctrl is not pressed or the cursor is not in a list, do nothing.
  if (!(event.ctrlKey && isCursorInList(editor))) return;

  // Else prevent the default behavior of Slate, React and DOM and stop the
  // propagation of this event.
  const { anchor } = editor.selection;
  const { slate } = config.settings;

  event.preventDefault();
  event.stopPropagation();

  // Store the current list item's path.
  const [, listItemPath] = getCurrentListItem(editor);

  // Don't allow in first line list item Check if the current list item is first
  // in its parent
  if (
    // If the selection starts at the beginning of a root-level block node
    anchor.path.slice(1).reduce((acc, n) => acc + n, 0) === 0 ||
    // or the current list item is the first in the list that contains it
    listItemPath[listItemPath.length - 1] === 0
  ) {
    // Mark the event as handled and do nothing.
    return true;
  }

  // Take the Node in the selection that is LI and is farthest-from-root.
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === slate.listItemType,
    // Explanation of the three modes:
    // * 'all' - take all the nodes from the root Editor node to the selected
    //   leaf Text node
    // * 'highest' - take the root Editor node (if there is a selection, in case
    //   no `at` option is given)
    // * 'lowest' - take the farthest-from-root selected leaf Text node
    // (Replace the "leaf Text node" expressions in the above list with
    // whatever matching function you use.)
    mode: 'lowest',
  });

  // Get the Path of the above-found Node.
  const [, at] = match;

  // Get the Path that represents the previous sibling node of the Path above.
  // TODO: handle the exception that this can throw, when `at` has the last
  // number in it a `0`. This case is possible because the condition above that
  // uses the Array.prototype.reduce method checks only the sum but the last 2
  // items can be [2, 0], their sum is 2 but the last item is 0, so the
  // exception is thrown.
  const to = Path.previous(at);

  // If the Path does not exist, mark the event as handled and do nothing.
  if (!Node.has(editor, to)) return true;

  // Move the Node in the selection that is LI and is farthest-from-root to the
  // existing Path just before its current location.
  Transforms.moveNodes(editor, { at, to });

  // Mark the event as handled.
  return true;
}

/**
 * Move down a list with with `Ctrl+Down`. (The Down key is supposed here to be
 * pressed.)
 * @param {Editor} Editor
 * @param {KeyboardEvent} event
 */
export function moveListItemDown({ editor, event }) {
  // If Ctrl is not pressed or the cursor is not in a list, do nothing.
  if (!event.ctrlKey) return;
  if (!isCursorInList(editor)) return false;

  // Else
  const { slate } = config.settings;

  // Take the Node in the selection that is LI and is farthest-from-root.
  const [match] = Editor.nodes(editor, {
    // Explanation of the three modes:
    // * 'all' - take all the nodes from the root Editor node to the selected
    //   leaf Text node
    // * 'highest' - take the root Editor node (if there is a selection, in case
    //   no `at` option is given)
    // * 'lowest' - take the farthest-from-root selected leaf Text node
    // (Replace the "leaf Text node" expressions in the above list with
    // whatever matching function you use.)
    match: (n) => n.type === slate.listItemType,
    reverse: true,
    mode: 'lowest',
  });

  // Get the Path of the above-found Node.
  const [, at] = match;

  // Get the Path that represents the next sibling node of the Path above.
  const to = Path.next(at);

  // Prevent the default behavior of Slate, React and DOM and stop the
  // propagation of this event.
  event.preventDefault();
  event.stopPropagation();

  // If the Path does not exist, mark the event as handled and do nothing.
  if (!Node.has(editor, to)) return true;

  // Move the Node in the selection that is LI and is farthest-from-root to the
  // existing Path just after its current location, if there is a place for it
  // at the same depth.
  Transforms.moveNodes(editor, { at, to });

  // Mark the event as handled.
  return true;
}
