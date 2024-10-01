import { jsx } from 'slate-hyperscript';
import { LINK } from '@plone/volto-slate/constants';
import { deserialize } from '@plone/volto-slate/editor/deserialize';
import { isEmpty } from 'lodash-es';
// import { Editor } from 'slate';

/**
 * @param {HTMLAnchorElement} aEl
 */
const hasValidTarget = (aEl) => {
  return (
    aEl.hasAttribute('target') &&
    ['_blank', '_self', '_parent', '_top'].includes(aEl.getAttribute('target'))
  );
};

/**
 * This is almost the inverse function of LinkElement render function at
 * src/editor/plugins/Link/render.jsx
 * @param {Editor} editor
 * @param {HTMLElement} el
 */
export const linkDeserializer = (editor, el) => {
  let parent = el;

  let children = Array.from(parent.childNodes)
    .map((el) => deserialize(editor, el))
    .flat();

  if (isEmpty(children)) {
    //nodes must contain at least one Text descendant
    children = [{ text: '' }];
  }

  const attrs = {
    type: LINK,
    url: el.getAttribute('href'),
    data: {},
  };

  if (el.hasAttribute('title')) attrs.data.title = el.getAttribute('title');

  const targetSet = hasValidTarget(el);

  // We don't use this isExternalLink because links can come w/o a target from
  // outside of Volto Slate blocks and still be external.
  // let isExternalLink;
  if (targetSet) {
    attrs.data = attrs.data || {};
    attrs.data.link = attrs.data.link || {};
    attrs.data.link.external = { target: el.getAttribute('target') };
    // isExternalLink = true;
  } else {
    // isExternalLink = false;
  }

  if (attrs.url?.startsWith('mailto:')) {
    // TODO: improve security because we are using regex-es
    attrs.data = attrs.data || {};
    attrs.data.link = attrs.data.link || {};
    attrs.data.link.email = {
      email_address: attrs.url
        .replace(/^mailto:/g, '')
        .replace(/\?subject=.+$/g, ''),
    };

    const subject = attrs.url.match(/\?subject=(.*)$/);
    if (subject && subject[1]) {
      attrs.data.link.email.email_subject = subject[1];
    }
  } else if (/* !isExternalLink &&  */ attrs.url?.startsWith('/')) {
    // TODO: improve this condition if it is not very good
    attrs.data = attrs.data || {};
    attrs.data.link = attrs.data.link || {};
    attrs.data.link.internal = { internal_link: [{ '@id': attrs.url }] };
  } else {
    // the general condition: if it is external link
    attrs.data = attrs.data || {};
    attrs.data.link = attrs.data.link || {};
    attrs.data.link.external = attrs.data.link.external || {};
    attrs.data.link.external.external_link = attrs.url;
    if (!targetSet) {
      attrs.data.link.external.target = '_self';
    }
  }

  return jsx('element', attrs, children);
};

linkDeserializer.id = 'linkDeserializer';
