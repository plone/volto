import { Text } from 'slate';
import Slugger from 'github-slugger';
import { normalizeString } from '@plone/volto/helpers/Utils/Utils';

/**
 * Get the text of a node as it reads when rendered.
 *
 * Unlike `serializeNodesToText`, which is meant for indexing and separates the
 * text of every node with whitespace, this concatenates the text of the inline
 * children of a node without inserting or dropping any whitespace. This is
 * required to build anchors, since a heading split into several leafs by inline
 * formatting (bold, italic, links) must produce the same text as the same
 * heading written without any formatting.
 *
 * @function serializeNodeToInlineText
 * @param {Object} node A Slate node.
 * @returns {string} The text of the node.
 */
export const serializeNodeToInlineText = (node) => {
  if (!node) return '';
  if (Text.isText(node)) return node.text;
  return (node.children || []).map(serializeNodeToInlineText).join('');
};

/**
 * Get the anchor text of a node, with the surrounding whitespace removed and
 * the inner whitespace collapsed.
 *
 * The empty text nodes that Slate keeps around inline elements would otherwise
 * end up as stray separators in the resulting slug.
 *
 * @function getAnchorText
 * @param {Object} node A Slate node.
 * @returns {string} The anchor text of the node.
 */
export const getAnchorText = (node) =>
  serializeNodeToInlineText(node).replace(/\s+/g, ' ').trim();

/**
 * Get the anchor (the `id` attribute) that the view of a Slate block renders
 * for the given node.
 *
 * Both the block view and the block's table of contents entry use it, so that
 * the links of the table of contents always match the anchors in the page.
 *
 * @function getAnchor
 * @param {Object} node A Slate node.
 * @returns {string} The anchor of the node.
 */
export const getAnchor = (node) =>
  Slugger.slug(normalizeString(getAnchorText(node)));
