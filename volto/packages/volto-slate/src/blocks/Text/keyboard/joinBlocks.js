import ReactDOM from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import { Editor } from 'slate';
import {
  getPreviousVoltoBlock,
  getNextVoltoBlock,
  mergeSlateWithBlockBackward,
  mergeSlateWithBlockForward,
} from '@plone/volto-slate/utils/volto-blocks';
import {
  isCursorAtBlockStart,
  isCursorAtBlockEnd,
} from '@plone/volto-slate/utils/selection';
import { makeEditor } from '@plone/volto-slate/utils/editor';
import {
  changeBlock,
  deleteBlock,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers/Blocks/Blocks';
/**
 * Joins the current block (which has an active Slate Editor)
 * with the previous block, to make a single block.
 *
 * @param {Editor} editor
 * @param {KeyboardEvent} event
 */
export function joinWithPreviousBlock({ editor, event }, intl) {
  if (!isCursorAtBlockStart(editor)) return;

  const blockProps = editor.getBlockProps();
  const {
    block,
    index,
    saveSlateBlockSelection,
    onSelectBlock,
    data,
    properties,
    onChangeField,
  } = blockProps;

  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const prev = getPreviousVoltoBlock(index, properties);
  if (!prev) return;
  const [otherBlock = {}, otherBlockId] = prev;

  // Don't join with required blocks
  if (data?.required || otherBlock?.required || otherBlock['@type'] !== 'slate')
    return;

  event.stopPropagation();
  event.preventDefault();

  // If the Editor contains no characters TODO: clarify if this special case
  // really needs to be handled or not. In `joinWithNextBlock` it is not
  // handled.
  const text = Editor.string(editor, []);
  if (!text) {
    const cursor = getBlockEndAsRange(otherBlock);
    const newFormData = deleteBlock(properties, block, intl);

    ReactDOM.unstable_batchedUpdates(() => {
      saveSlateBlockSelection(otherBlockId, cursor);

      onChangeField(blocksFieldname, newFormData[blocksFieldname]);
      onChangeField(blocksLayoutFieldname, newFormData[blocksLayoutFieldname]);

      onSelectBlock(otherBlockId);
    });

    return true;
  }

  // Else the editor contains characters, so we merge the current block's
  // `editor` with the block before, `otherBlock`.
  const cursor = mergeSlateWithBlockBackward(editor, otherBlock);

  const combined = JSON.parse(JSON.stringify(editor.children));

  // // TODO: don't remove undo history, etc Should probably save both undo
  // // histories, so that the blocks are split, the undos can be restored??

  // const cursor = getBlockEndAsRange(otherBlock);
  const formData = changeBlock(properties, otherBlockId, {
    '@type': 'slate', // TODO: use a constant specified in src/constants.js instead of 'slate'
    value: combined,
    plaintext: serializeNodesToText(combined || []),
  });
  const newFormData = deleteBlock(formData, block, intl);

  ReactDOM.unstable_batchedUpdates(() => {
    saveSlateBlockSelection(otherBlockId, cursor);
    onChangeField(blocksFieldname, newFormData[blocksFieldname]);
    onChangeField(blocksLayoutFieldname, newFormData[blocksLayoutFieldname]);
    onSelectBlock(otherBlockId);
  });

  return true;
}

/**
 * Joins the current block (which has the cursor) with the next block to make a
 * single block.
 * @param {Editor} editor
 * @param {KeyboardEvent} event
 */
export function joinWithNextBlock({ editor, event }, intl) {
  if (!isCursorAtBlockEnd(editor)) return;

  const blockProps = editor.getBlockProps();
  const {
    block,
    index,
    // saveSlateBlockSelection,
    onSelectBlock,
    data,
  } = blockProps;

  const { properties, onChangeField } = editor.getBlockProps();
  const [otherBlock = {}, otherBlockId] = getNextVoltoBlock(index, properties);

  // Don't join with required blocks
  if (data?.required || otherBlock?.required || otherBlock['@type'] !== 'slate')
    return;

  event.stopPropagation();
  event.preventDefault();

  mergeSlateWithBlockForward(editor, otherBlock);

  // const cursor = JSON.parse(JSON.stringify(editor.selection));
  const combined = JSON.parse(JSON.stringify(editor.children));

  // TODO: don't remove undo history, etc Should probably save both undo
  // histories, so that the blocks are split, the undos can be restored??

  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const formData = changeBlock(properties, otherBlockId, {
    // TODO: use a constant specified in src/constants.js instead of 'slate'
    '@type': 'slate',
    value: combined,
    plaintext: serializeNodesToText(combined || []),
  });
  const newFormData = deleteBlock(formData, block, intl);

  ReactDOM.unstable_batchedUpdates(() => {
    // saveSlateBlockSelection(otherBlockId, cursor);
    onChangeField(blocksFieldname, newFormData[blocksFieldname]);
    onChangeField(blocksLayoutFieldname, newFormData[blocksLayoutFieldname]);
    onSelectBlock(otherBlockId);
  });
  return true;
}

/**
 * @param {object} block The Volto object representing the configuration and
 * contents of a Volto Block of type Slate Text.
 * @returns {Range} The collapsed Slate Range that represents the last position
 * the text cursor can take inside the given block.
 */
function getBlockEndAsRange(block) {
  const { value } = block;
  const location = [value.length - 1]; // adress of root node
  const editor = { children: value };
  const newEditor = makeEditor();
  newEditor.children = cloneDeep(editor.children);
  const path = Editor.last(newEditor, location)[1]; // last Node in the block
  // The last Text node (leaf node) entry inside the path computed just above.
  const [leaf, leafpath] = Editor.leaf(newEditor, path);
  // The offset of the Points in the collapsed Range computed below:
  const offset = (leaf.text || '').length;

  return {
    anchor: { path: leafpath, offset },
    focus: { path: leafpath, offset },
  };
}
