import { INLINE_ELEMENTS, TEXT_NODE } from '../constants';

// Original at https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
/**
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use JavaScript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 */

/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the |CharacterData| interface (i.e.,
 *             a |Text|, |Comment|, or |CDATASection| node
 * @return     True if all of the text content of |nod| is whitespace,
 *             otherwise false.
 */
export function is_all_ws(text) {
  return !/[^\t\n\r ]/.test(text);
}

/**
 * Version of |data| that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space. (Normally
 * |data| is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
export function data_of(txt) {
  let data = txt.textContent;
  data = data.replace(/[\t\n\r ]+/g, ' ');
  if (data[0] === ' ') {
    data = data.substring(1, data.length);
  }
  if (data[data.length - 1] === ' ') {
    data = data.substring(0, data.length - 1);
  }
  return data;
}

/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the DOM1 |Node| interface.
 * @return     true if the node is:
 *                1) A |Text| node that is all whitespace
 *                2) A |Comment| node
 *             and otherwise false.
 */

export function is_ignorable(nod) {
  return (
    nod.nodeType === 8 || // A comment node
    (nod.nodeType === 3 && is_all_ws(nod.textContent))
  ); // a text node, all ws
}

/**
 * Version of |previousSibling| that skips nodes that are entirely
 * whitespace or comments. (Normally |previousSibling| is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest previous sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
export function node_before(sib) {
  while ((sib = sib.previousSibling)) {
    if (!is_ignorable(sib)) {
      return sib;
    }
  }
  return null;
}

/**
 * Version of |nextSibling| that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest next sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
export function node_after(sib) {
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) {
      return sib;
    }
  }
  return null;
}

/**
 * Version of |lastChild| that skips nodes that are entirely
 * whitespace or comments. (Normally |lastChild| is a property
 * of all DOM nodes that gives the last of the nodes contained
 * directly in the reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The last child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
export function last_child(par) {
  let res = par.lastChild;
  while (res) {
    if (!is_ignorable(res)) {
      return res;
    }
    res = res.previousSibling;
  }
  return null;
}

/**
 * Version of |firstChild| that skips nodes that are entirely
 * whitespace and comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The first child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
export function first_child(par) {
  let res = par.firstChild;
  while (res) {
    if (!is_ignorable(res)) {
      return res;
    }
    res = res.nextSibling;
  }
  return null;
}

export const removeSpaceBeforeAfterEndLine = (text) => {
  text = text.replace(/\s+\n/gm, '\n'); // space before endline
  text = text.replace(/\n\s+/gm, '\n'); // space after endline
  return text;
};

export const convertTabsToSpaces = (text) => text.replace(/\t/gm, ' ');
export const convertLineBreaksToSpaces = (text) => text.replace(/\n/gm, ' ');

export const isInline = (node) =>
  node &&
  (node.nodeType === TEXT_NODE || INLINE_ELEMENTS.includes(node.nodeName));

export const removeSpaceFollowSpace = (text, node) => {
  // Any space immediately following another space (even across two separate
  // inline elements) is ignored (rule 4)
  text = text.replace(/ ( +)/gm, ' ');
  if (!text.startsWith(' ')) return text;

  if (node.previousSibling) {
    if (node.previousSibling.nodeType === TEXT_NODE) {
      if (node.previousSibling.textContent.endsWith(' ')) {
        return text.replace(/^ /, '');
      }
    } else if (isInline(node.previousSibling)) {
      const prevText = collapseInlineSpace(node.previousSibling);
      if (prevText.endsWith(' ')) {
        return text.replace(/^ /, '');
      }
    }
  } else {
    const parent = node.parentNode;
    if (parent.previousSibling) {
      //  && isInline(parent.previousSibling)
      const prevText = collapseInlineSpace(parent.previousSibling);
      if (prevText && prevText.endsWith(' ')) {
        return text.replace(/^ /, '');
      }
    }
  }

  return text;
};

export const removeElementEdges = (text, node) => {
  if (
    !isInline(node.parentNode) &&
    !node.previousSibling &&
    text.match(/^\s/)
  ) {
    text = text.replace(/^\s+/, '');
  }

  if (text.match(/\s$/) && !node.nextSibling && !isInline(node.parentNode)) {
    text = text.replace(/\s$/, '');
  }

  return text;
};

export const collapseInlineSpace = (node) => {
  let text = node.textContent;

  // See https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace

  // 1. all spaces and tabs immediately before and after a line break are ignored

  text = removeSpaceBeforeAfterEndLine(text);

  // 2. Next, all tab characters are handled as space characters
  text = convertTabsToSpaces(text);

  // 3. Convert all line breaks to spaces
  text = convertLineBreaksToSpaces(text);

  // 4. Any space immediately following another space
  // (even across two separate inline elements) is ignored
  text = removeSpaceFollowSpace(text, node);

  // 5. Sequences of spaces at the beginning and end of an element are removed
  text = removeElementEdges(text, node);

  // (volto) Return null if the element is not adjacent to an inline node
  // This will cause the element to be ignored in the deserialization
  // TODO: use the node traverse functions defined here
  if (
    is_all_ws(text) &&
    !(
      isInline(node.previousSibling) ||
      isInline(node.nextSibling) ||
      isInline(node.parentNode.nextSibling) ||
      isInline(node.parentNode.previousSibling)
    )
  ) {
    return null;
  }

  return text;
};
