import React from 'react';
import { BlockButton } from 'volto-slate/editor/ui';
import quoteIcon from '@plone/volto/icons/quote.svg';

// TODO: this needs to use constants for el type

export const BlockquoteElement = ({ attributes, children, element }) => {
  // the 'callout' class is defined in file 'blocks.less'
  // TODO: move the style out of it into a `blockquote` tag name selector
  return (
    <blockquote {...attributes} className="callout">
      {children}
    </blockquote>
  );
};

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons['blockquote'] = (props) => (
    <BlockButton
      format="blockquote"
      icon={quoteIcon}
      title="Blockquote"
      {...props}
    />
  );
  slate.elements['blockquote'] = BlockquoteElement;

  slate.toolbarButtons.push('blockquote');
  slate.expandedToolbarButtons.push('blockquote');

  return config;
}
