import { jsx } from 'slate-hyperscript';
import { Text } from 'slate';
import { isWhitespace } from 'volto-slate/utils';
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

/**
 * Deserialize to an object or an Array.
 *
 * This returns a Slate Node or null.
 */
export const deserialize = (editor, el) => {
  // console.log('deserialize el:', el);
  const { htmlTagsToSlate } = editor;

  // console.log('des:', el.nodeType, el);
  if (el.nodeType === COMMENT) {
    return null;
  } else if (el.nodeType === TEXT_NODE) {
    // instead of === '\n' we use isWhitespace for when deserializing tables
    // from Calc and other similar cases

    // console.log('maybe whitespace', {
    //   text: `-${el.textContent}-`,
    //   prev: el.previousSibling,
    //   next: el.nextSibling,
    //   isPrev: isInline(el.previousSibling),
    //   isNext: isInline(el.nextSibling),
    //   prevName: el.previousSibling && el.previousSibling.nodeName,
    //   nextName: el.nextSibling && el.nextSibling.nodeName,
    // });

    if (isWhitespace(el.textContent)) {
      // console.log({
      //   text: `-${el.textContent}-`,
      //   prev: el.previousSibling,
      //   next: el.nextSibling,
      //   isPrev: isInline(el.previousSibling),
      //   isNext: isInline(el.nextSibling),
      //   prevName: el.previousSibling && el.previousSibling.nodeName,
      //   nextName: el.nextSibling && el.nextSibling.nodeName,
      // });
      // if it's empty text between 2 tags, it should be ignored
      return isInline(el.previousSibling) || isInline(el.nextSibling)
        ? { text: el.textContent } // perceptually multiple whitespace render as a single space
        : null;
    }
    return {
      text: el.textContent
        .replace(/\n$/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\t/g, ''),
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
    children[0].nodeType === 3 &&
    children[0].textContent === '\n'
  ) {
    return jsx('text', {}, ' ');
  }
  children = deserializeChildren(el, editor);

  // whitespace is replaced by deserialize() with null;
  children = children.map((c) => (c === null ? ' ' : c));

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
