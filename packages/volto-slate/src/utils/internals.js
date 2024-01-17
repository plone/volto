import { Editor } from 'slate';

/**
 * @param {Point} point The point to verify.
 * @returns {boolean} Whether it refers to a (leaf) Text node in the closest-to-root level it can be.
 */
export const isPointAtRoot = (point) => point.path.length === 2;

/**
 * @summary Returns true if the specified range has any of its edges at the
 * closest-to-root level a Point can be (a Point can only reffer to Text
 * nodes).
 * @description It does not assure the caller about whether the contents of the
 * range are at block level, but it does assure that one of the edges of the
 * given range is at closest-to-root level it can be. A range can cover inner
 * node children though. If through "inner node child" we also understand the
 * closest-to-root level Leaf nodes can be (taking into account this: Editor
 * - level 0, blocks - level 1, blocks and leaves - level 2, it is level 2)
 *   then the cursor specified by the given range can include inner node
 *   childs and the return value can be true at the same time. Practically the
 *   cursor is always at block level since nothing exists outside blocks in
 *   Slate and is always in Text nodes since a Point can only reffer to an
 *   offset in a Text node.
 * @param {Range} range Must be a valid `Range`, not `null` or `undefined`.
 * @returns {boolean}
 */
export const isRangeAtRoot = (range) => {
  return isPointAtRoot(range.anchor) || isPointAtRoot(range.focus);
};

/**
 * The block in a valid Slate document according to our schema can be here
 * either a Slate block that touches the root or a Slate inline (the other
 * possibility, a leaf Text node is excluded because we are taking the
 * parent of the selection).
 *
 * @param {Editor} editor
 * @param {Range} range
 *
 * @returns {boolean} true if the range (usually the selection) can be split
 * into two editors (usually Volto Slate Text blocks)
 */
export const rangeIsInSplittableNode = (editor, range) => {
  const [block] = Editor.parent(editor, range);
  return range && (isRangeAtRoot(range) || editor.isInline(block));
};
