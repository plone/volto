import { jsx } from 'slate-hyperscript';
import { Text } from 'slate';
// import { isWhitespace } from '@plone/volto-slate/utils';
import {
  TD,
  TH,
  COMMENT,
  ELEMENT_NODE,
  INLINE_ELEMENTS,
  TEXT_NODE,
} from '../constants';

const isInline = (node) =>
  node &&
  (node.nodeType === TEXT_NODE || INLINE_ELEMENTS.includes(node.nodeName));

const cleanWhitespace = (text) => {
  // replace multiple \n with a single \n
  text = text.replace(/\n+/gm, '\n');

  // replace \n inside text with a space
  text = text.replace(/(\S)\n(\S)/, '$1 $2');

  // collapse multiple spaces to single space
  text = text.replace(/ ( +)/gm, ' ');

  return text;
};

// const trimLineBreaksOnEdges = (text) => {
//   return text.replace(/^\n/, '').replace('\n$', '');
// };

const cleanSpaceBeforeAfterEndLine = (text) => {
  text = text.replace(/\s+\n/gm, '\n'); // space before endline
  text = text.replace(/\n\s+/gm, '\n'); // space after endline
  return text;
};

const convertTabsToSpaces = (text) => text.replace(/\t/gm, ' ');
const convertLineBreaksToSpaces = (text) => text.replace(/\n/gm, ' ');

const removeSpaceFollowSpace = (text, node) => {
  text = text.replace(/ ( +)/gm, ' ');
  if (!text.startsWith(' ')) return text;

  // previous sibling is a text node
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
  }

  return text;
};

const removeElementEdges = (text, node) => {
  if (
    text.match(/^\s/) &&
    !node.previousSibling &&
    !isInline(node.parentNode)
  ) {
    text = text.replace(/^\s+/, '');
  }

  if (text.match(/\s$/) && !node.nextSibling && !isInline(node.parentNode)) {
    text = text.replace(/^\s/, '');
  }

  return text;
};

export const htmlUtils = {
  cleanWhitespace,
  cleanSpaceBeforeAfterEndLine,
  convertTabsToSpaces,
  convertLineBreaksToSpaces,
  removeSpaceFollowSpace,
  removeElementEdges,
};

const collapseInlineSpace = (node) => {
  let text = node.textContent;

  // See https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace

  // 1. all spaces and tabs immediately before and after a line break are ignored

  text = htmlUtils.cleanSpaceBeforeAfterEndLine(text);

  // 2. Next, all tab characters are handled as space characters
  text = htmlUtils.convertTabsToSpaces(text);

  // 3. Convert all line breaks to spaces
  text = htmlUtils.convertLineBreaksToSpaces(text);

  // 4. Any space immediately following another space
  // (even across two separate inline elements) is ignored
  text = htmlUtils.removeSpaceFollowSpace(text, node);

  // 5. Sequences of spaces at the beginning and end of an element are removed
  text = htmlUtils.removeElementEdges(text, node);

  return text;
};

/**
 * Deserialize to a Slate Node, an Array of Slate Nodes or null
 *
 * One particularity of this function is that it tries to do
 * a "perception-based" conversion. For example, in html, multiple whitespaces
 * display as a single space. A new line character in text is actually rendered
 * as a space, etc. So we try to meet user's expectations that when they
 * copy/paste content, we'll preserve the aspect of their text.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
 */
export const deserialize = (editor, el) => {
  const { htmlTagsToSlate } = editor;

  if (el.nodeType === COMMENT) {
    return null;
  } else if (el.nodeType === TEXT_NODE) {
    let text = collapseInlineSpace(el);

    return {
      text,
    };
  } else if (el.nodeType !== ELEMENT_NODE) {
    return null;
  } else if (el.nodeName === 'BR') {
    // TODO: is handling <br> like this ok in all cases ?
    return { text: '\n' };
  }

  if (el.getAttribute('data-slate-data')) {
    return typeDeserialize(editor, el);
  }

  const { nodeName } = el;

  if (htmlTagsToSlate[nodeName]) {
    return htmlTagsToSlate[nodeName](editor, el);
  }

  return deserializeChildren(el, editor); // fallback deserializer
};

export const typeDeserialize = (editor, el) => {
  const jsData = el.getAttribute('data-slate-data');
  const { type, data } = JSON.parse(jsData);
  return jsx('element', { type, data }, deserializeChildren(el, editor));
};

export const deserializeChildren = (parent, editor) =>
  Array.from(parent.childNodes)
    .map((el) => deserialize(editor, el))
    .flat();

export const blockTagDeserializer = (tagname) => (editor, el) => {
  // if (tagname === 'h2') debugger;
  let children = deserializeChildren(el, editor).filter((n) => n !== null);

  if (
    [TD, TH].includes(tagname) &&
    children.length > 0 &&
    typeof children[0] === 'string'
  ) {
    // TODO: should here be handled the cases when there are more strings in
    // `children` or when there are besides strings other types of nodes too?
    const p = { type: 'div', children: [{ text: '' }] };
    p.children[0].text = children[0];
    children = [p];
  }

  // normalizes block elements so that they're never empty
  // Avoids a hard crash from the Slate editor
  const hasValidChildren = children.length && children.find((c) => !!c);
  if (!hasValidChildren) {
    children = [{ text: '' }];
  }

  return jsx('element', { type: tagname }, children);
};

export const bodyTagDeserializer = (editor, el) => {
  return jsx('fragment', {}, deserializeChildren(el, editor));
};

export const inlineTagDeserializer = (attrs) => (editor, el) => {
  return deserializeChildren(el, editor).map((child) => {
    const res =
      Text.isText(child) || typeof child === 'string'
        ? jsx('text', attrs, child)
        : {
            ...child,
            attrs, // pass the inline attrs as separate object
          };
    return res;
  });
};

export const spanTagDeserializer = (editor, el) => {
  const style = el.getAttribute('style') || '';
  let children = el.childNodes;

  if (
    // handle formatting from OpenOffice
    children.length === 1 &&
    children[0].nodeType === TEXT_NODE &&
    children[0].textContent === '\n'
  ) {
    return jsx('text', {}, ' ');
  }
  children = deserializeChildren(el, editor);

  // whitespace is replaced by deserialize() with null;
  // TODO: fix this
  children = children.map((c) => (c === null ? '' : c));

  // TODO: handle sub/sup as <sub> and <sup>
  // Handle Google Docs' <sub> formatting
  if (style.replace(/\s/g, '').indexOf('vertical-align:sub') > -1) {
    const attrs = { sub: true };
    return children.map((child) => {
      return jsx('text', attrs, child);
    });
  }

  // Handle Google Docs' <sup> formatting
  if (style.replace(/\s/g, '').indexOf('vertical-align:super') > -1) {
    const attrs = { sup: true };
    return children.map((child) => {
      return jsx('text', attrs, child);
    });
  }

  const res = children.find((c) => typeof c !== 'string')
    ? children
    : jsx('text', {}, children);

  return res;
};

export const bTagDeserializer = (editor, el) => {
  // Google Docs does weird things with <b> tag
  return (el.getAttribute('id') || '').indexOf('docs-internal-guid') > -1
    ? deserializeChildren(el, editor)
    : jsx('element', { type: 'b' }, deserializeChildren(el, editor));
};

export const codeTagDeserializer = (editor, el) => {
  return jsx('element', { type: 'code' }, el.textContent);
};

export const preTagDeserializer = (editor, el) => {
  // Based on Slate example implementation. Replaces <pre> tags with <code>.
  // Comment: I don't know how good of an idea is this. I'd rather have two
  // separate formats: "preserve whitespace" and "code". This feels like a hack
  const { nodeName } = el;
  let parent = el;

  if (el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    parent = el.childNodes[0];
    return codeTagDeserializer(editor, parent);
  }

  return blockTagDeserializer(nodeName)(editor, parent);
};

export default deserialize;

// if (isWhitespace(el.textContent)) {
//   // if it's empty text between 2 tags, it should be ignored
//   return isInline(el.previousSibling) || isInline(el.nextSibling)
//     ? { text: cleanWhitespace(el.textContent) } // perceptually multiple whitespace render as a single space
//     : null;
// }
// let text = el.textContent; // cleanWhitespace()
// trim line breaks at edges of tag, see https://www.w3.org/TR/html4/appendix/notes.html
//
// B.3.1 Line breaks
// SGML (see [ISO8879], section 7.6.1) specifies that a line break
// immediately following a start tag must be ignored, as must a line break
// immediately before an end tag. This applies to all HTML elements without
// exception.

// text = trimLineBreaksOnEdges(text);

// return { text };
// console.log('text', { text, tc: el.textContent });

// if (isInline(el.parentElement.previousSibling)) {
//   // if previous element is inline, replace beginning new line with a space
//   text = text.replace(/^\n(\S)/gm, ' $1');
// }
//
// if (
//   (el.parentElement.previousSibling &&
//     !isInline(el.parentElement.previousSibling)) ||
//   !el.parentElement.previousSibling
// ) {
//   // if previous element is block (or doesn't exist), remove beginning new line
//   text = text.replace(/^\n(\S)/gm, '$1');
// }
//
// // remove trailing newlines
// text = text.replace(/\n$/gm, '');
//
// // const hadSpaceInFront = text.match(/^ /);
// const hadSpaceAtEnd = text.match(/ $/);
//
// // trim beginning and end whitespace
// text = text.replace(/^\s+(\S)/gm, '$1');
// text = text.replace(/(\S)\s+$/gm, '$1');
//
// // TODO: don't be so optimistic about nextSibling, it can be another type
// // of node. There should be a smarter version, the traverses siblings until
// // it finds a text, element or inline node
// if (
//   isInline(el.parentElement) &&
//   isInline(el.parentElement.nextSibling) &&
//   el.parentElement.nextSibling.nodeType !== TEXT_NODE
// ) {
//   text = `${text} `; // add a space at end if the next node is inline node
//   // This is the behavior of Google Docs
// }
//
// // add a space if previous element is an inline node that doesn't end with
// // space
// if (
//   el.previousSibling &&
//   isInline(el.previousSibling) &&
//   !(el.previousSibling.textContent || '').match(/ $/)
// ) {
//   text = ` ${text}`;
// }
//
// // add a space if next element is an inline node that doesn't start with
// if (
//   el.parentElement.nextSibling &&
//   isInline(el.parentElement.nextSibling) &&
//   !(el.parentElement.nextSibling.textContent || '').match(/^ /) &&
//   hadSpaceAtEnd
// ) {
//   text = `${text} `;
// }
