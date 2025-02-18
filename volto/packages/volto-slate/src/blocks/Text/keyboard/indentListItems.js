import { Editor, Path, Transforms } from 'slate';
import {
  isCursorInList,
  getCurrentListItem,
  mergeWithNextList,
  mergeWithPreviousList,
} from '@plone/volto-slate/utils/lists';
import { deconstructToVoltoBlocks } from '@plone/volto-slate/utils/volto-blocks';
import config from '@plone/volto/registry';

/**
 * @function indentListItems
 * @param {Editor} editor
 * @param {Event} event
 *
 * This bit is quite involved. You need a good understanding of Slate API and
 * Slate's DOM-like behaviour.
 *
 * The markup we're trying to produce is like:
 *
 * ```
 *  <ul>
 *    <li>something</li>
 *    <ul>
 *      <li>else</li>
 *    </ul>
 *  </ul>
 * ```
 *
 * Although not the cleanest, there are numerous advantages to having lists like
 * this:
 * - Code is a lot cleaner, easy to understand and maintain
 * - Google Docs produces the same type of lists
 * - HTML produced by LibreWriter (as witnesed in clipboard transfer) is same
 *
 * See https://github.com/eea/volto-slate/releases/tag/ul_inside_li for an
 * implementation that "inlines" the <ul> tags inside <li>. It's not pretty.
 */
export function indentListItems({ editor, event }) {
  // TODO: test if the cursor is at the beginning of the list item

  // If the text cursor is not in a list, then do nothing.
  if (!isCursorInList(editor)) {
    return;
  } else {
    // Else prevent the default event handling and bubbling.
    event.preventDefault();
    event.stopPropagation();

    // If Shift & Ctrl, decrease multiple items depth. If Shift & !Ctrl,
    // decrease item depth. If !Shift & Ctrl, increase multiple item depth. If
    // !Shift & !Ctrl, increase item depth.
    return event.shiftKey
      ? event.ctrlKey
        ? decreaseMultipleItemsDepth(editor, event)
        : decreaseItemDepth(editor, event)
      : event.ctrlKey
        ? increaseMultipleItemDepth(editor, event)
        : increaseItemDepth(editor, event);
  }
}

/**
 * Handle the new Volto blocks created by `deconstructToVoltoBlocks`.
 * @param {Editor} editor The Slate editor object as customized by the
 * volto-slate addon.
 * @param {string[]} newIds The IDs of the newly created Volto blocks.
 */
const handleNewVoltoBlocks = (editor, blockIds) => {
  const props = editor.getBlockProps();
  props.onSelectBlock(blockIds[blockIds.length - 1]);
};

/**
 * @function decreaseItemDepth
 *
 * Decreases indent level of a single list item.
 *
 * @param {Editor} editor
 * @param {Event} event
 */
export function decreaseItemDepth(editor, event) {
  const { slate } = config.settings;

  // Current list item being unindented
  const [listItemNode, listItemPath] = getCurrentListItem(editor);

  // The ul/ol that holds the current list item
  const [, parentListPath] = Editor.parent(editor, listItemPath);

  // TODO: when unindenting a sublist item, it should take its next siblings
  // with it as a sublist
  const listItemRef = Editor.pathRef(editor, listItemPath);

  // TODO: please clarify, we unwrap at list item path but we only unwrap nodes
  // that match list types, but list item type is different from all list types:
  Transforms.unwrapNodes(editor, {
    at: listItemPath,
    split: true,
    mode: 'lowest',
    match: (node) => slate.listTypes.includes(node.type),
  });

  /**
   * This condition is the same as "listItemRef.current is not the root editor
   * node or one if its children".
   */
  function getCondition1() {
    return listItemRef.current.length > 1;
  }

  /**
   * @returns The current parent Node of the PathRef linked to the initial list
   * item that we want deindented.
   */
  function getParent() {
    return Path.parent(listItemRef.current);
  }

  // Merge with any previous <ul/ol> list
  if (getCondition1()) mergeWithPreviousList(editor, getParent());

  // Merge with any next <ul/ol> list
  if (getCondition1()) mergeWithNextList(editor, getParent());

  if (parentListPath.length === 1) {
    // Our parent is at root, just under the Editor, where just block nodes can
    // be, and the user wants to break out so we unwrap the list item. Usually
    // this means making the list item a `p` just below the Editor in the
    // document tree, keeping its contents.
    Transforms.setNodes(
      editor,
      { type: slate.defaultBlockType },
      {
        at: listItemRef.current,
        match: (node) => node === listItemNode,
      },
    );
  }

  listItemRef.unref();

  // If we have more then one child in the editor root, break to volto blocks
  if (editor.children.length > 1) {
    deconstructToVoltoBlocks(editor).then((newIds) => {
      handleNewVoltoBlocks(editor, newIds);
    });
  }

  return true;
}

/**
 * Increases the depth (indent level) of a single list item.
 *
 * @param {Editor} editor
 * @param {Event} event
 */
export function increaseItemDepth(editor, event) {
  // test if there's a sibling ul element above (in this case we insert at end)
  // or below (then we insert at top)

  // Get the current list item's path.
  const [, listItemPath] = getCurrentListItem(editor);

  // Get the current list item's parent Node.
  const [parentList] = Editor.parent(editor, listItemPath);

  const { slate } = config.settings;
  const { type } = parentList;

  // If the parent is not a list
  if (!slate.listTypes.includes(type)) {
    // Do not increase any indent level. And also, this situation shows that
    // there is a LI inside something that is not a list, and this means that
    // something broke the data in the Slate document. TODO: Maybe throw an
    // exception?
    return false; // false means that the event was not practically handled
  }

  /**
   * Create a list of the same type as the parent list and put the specified
   * list item in it, then put the new list inside the parent list.
   */
  function wrapListItem() {
    Transforms.wrapNodes(
      editor,
      // `children` property is added automatically as an empty array then
      // normalized
      { type: type },
      {
        at: listItemPath,
      },
    );
  }

  // If the parent list is just below the Editor node
  if (parentList.children.length === 1) {
    // There should be just one block node inside the Editor node in volto-slate
    // (what about table cells? currently they allow multiple paragraphs in
    // them), so there should be no previous or next sibling.
    wrapListItem();
    return true;
  }

  wrapListItem();

  // listItemPath was wrapped in a node, so it now points to a list
  const currentListRef = Editor.pathRef(editor, listItemPath);

  // Merge with any previous <ul/ol> list
  mergeWithPreviousList(editor, currentListRef.current);

  // Merge with any next <ul/ol> list
  mergeWithNextList(editor, currentListRef.current);

  currentListRef.unref();

  return true;
}

/**
 * [Not implemented] Indents current list item + plus siblings that come after
 * it.
 * @param {Editor} editor
 * @param {Event} event
 */
export function increaseMultipleItemDepth(editor, event) {
  // TODO: implement
}

/**
 * [Not implemented] Un-indents current list item + plus siblings that come
 * after it.
 * @param {Editor} editor
 * @param {Event} event
 */
export function decreaseMultipleItemsDepth(editor, event) {
  // TODO: implement
}
