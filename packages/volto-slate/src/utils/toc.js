import { Node } from 'slate';
import Slugger from 'github-slugger';
import { normalizeString } from '@plone/volto/helpers/Utils/Utils';

/**
 * Get the anchor text of a node, as it reads when rendered, with the
 * surrounding whitespace removed and the inner whitespace collapsed.
 *
 * Unlike `serializeNodesToText`, which is meant for indexing and separates the
 * text of every node with whitespace, `Node.string` concatenates the text of
 * the children of a node without inserting any whitespace. This is required to
 * build anchors, since a heading split into several leafs by inline formatting
 * or by an inline link must produce the same text as the same heading written
 * without any of them.
 *
 * @function getAnchorText
 * @param {Object} node A Slate node.
 * @returns {string} The anchor text of the node.
 */
export const getAnchorText = (node) =>
  node ? Node.string(node).replace(/\s+/g, ' ').trim() : '';

/**
 * Slug the given text, the way the anchors of a Slate block are slugged.
 *
 * Kept apart from `getAnchor` so that a caller that already extracted the text
 * of a node does not have to walk it a second time.
 *
 * @function slugAnchor
 * @param {string} text The text to slug.
 * @returns {string} The slug of the text.
 */
export const slugAnchor = (text) => Slugger.slug(normalizeString(text));

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
export const getAnchor = (node) => slugAnchor(getAnchorText(node));
