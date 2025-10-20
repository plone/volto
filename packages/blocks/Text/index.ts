import React from 'react';
import config from '@plone/registry';

const TextBlockInfo = {
  id: 'slate',
  title: 'Rich text',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TextBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TextBlockEdit'),
  ),
  category: 'text',
  tocEntry: (block = {}) => {
    const { value, override_toc, entry_text, level, plaintext } = block;
    const type = value?.[0]?.type;
    return override_toc && level
      ? [parseInt(level.slice(1)), entry_text]
      : config.settings.slate.topLevelTargetElements.includes(type)
        ? [parseInt(type.slice(1)), plaintext]
        : null;
  },
};

export default TextBlockInfo;
