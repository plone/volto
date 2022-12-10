import { jsx } from 'slate-hyperscript';
import { Text } from 'slate';
// import { isWhitespace } from '@plone/volto-slate/utils';
import { TD, TH, COMMENT, ELEMENT_NODE, TEXT_NODE } from '../constants';

import { collapseInlineSpace } from './utils';

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
export const deserialize = (
  editor,
  el,
  options = { collapseWhitespace: true },
) => {
  const { htmlTagsToSlate } = editor;

  if (el.nodeType === COMMENT) {
    return null;
  } else if (el.nodeType === TEXT_NODE) {
    const text = options.collapseWhitespace
      ? collapseInlineSpace(el)
      : el.textContent;
    return text
      ? {
          text,
        }
      : null;
  } else if (el.nodeType !== ELEMENT_NODE) {
    return null;
  } else if (el.nodeName === 'BR') {
    // gets merged with sibling text nodes by Slate normalization in insertData
    return { text: '\n' };
  }

  if (el.getAttribute('data-slate-data')) {
    return typeDeserialize(editor, el, options);
  }

  const { nodeName } = el;

  if (htmlTagsToSlate[nodeName]) {
    return htmlTagsToSlate[nodeName](editor, el, options);
  }

  // fallback deserializer, all unknown elements are "stripped"
  return deserializeChildren(el, editor, options);
};

export const typeDeserialize = (editor, el, options) => {
  const jsData = el.getAttribute('data-slate-data');
  const { type, data } = JSON.parse(jsData);
  return jsx(
    'element',
    { type, data },
    deserializeChildren(el, editor, options),
  );
};

export const deserializeChildren = (parent, editor, options) =>
  Array.from(parent.childNodes)
    .map((el) => deserialize(editor, el, options))
    .flat();

export const blockTagDeserializer = (tagname) => (editor, el, options) => {
  // if (tagname === 'h2') debugger;
  let children = deserializeChildren(el, editor, options).filter(
    (n) => n !== null,
  );

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

  console.log('children', children);
  return jsx('element', { type: tagname }, children);
};

export const bodyTagDeserializer = (editor, el, options) => {
  return jsx('fragment', {}, deserializeChildren(el, editor, options));
};

export const inlineTagDeserializer = (attrs) => (editor, el, options) => {
  return deserializeChildren(el, editor, options).map((child) => {
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

export const spanTagDeserializer = (editor, el, options) => {
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
  children = deserializeChildren(el, editor, options);

  // whitespace is replaced by deserialize() with null;
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

export const bTagDeserializer = (editor, el, options) => {
  // Google Docs does weird things with <b> tag
  return (el.getAttribute('id') || '').indexOf('docs-internal-guid') > -1
    ? deserializeChildren(el, editor, options)
    : jsx('element', { type: 'b' }, deserializeChildren(el, editor, options));
};

export const codeTagDeserializer = (editor, el, options) => {
  return jsx('element', { type: 'code' }, el.textContent);
};

export const preTagDeserializer = (editor, el, options) => {
  // Based on Slate example implementation. Replaces <pre> tags with <code>.
  // Comment: I don't know how good of an idea is this. I'd rather have two
  // separate formats: "preserve whitespace" and "code". This feels like a hack
  const { nodeName } = el;
  let parent = el;

  if (el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    parent = el.childNodes[0];
    return codeTagDeserializer(editor, parent, options);
  }

  return blockTagDeserializer(nodeName)(editor, parent, options);
};

export default deserialize;
