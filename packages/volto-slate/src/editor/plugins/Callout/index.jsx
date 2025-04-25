import React from 'react';
import BlockButton from '@plone/volto-slate/editor/ui/BlockButton';
import calloutSVG from '@plone/volto/icons/megaphone.svg';

// TODO: this needs to use constants for el type

export const CalloutElement = ({ attributes, children, element }) => {
  // the 'callout' class is defined in file 'blocks.less'
  // TODO: move the style out of it into a `blockquote` tag name selector
  return (
    <p {...attributes} className="callout">
      {children}
    </p>
  );
};

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons['callout'] = (props) => (
    <BlockButton
      format="callout"
      icon={calloutSVG}
      title="Callout"
      {...props}
    />
  );
  slate.elements['callout'] = CalloutElement;

  slate.toolbarButtons.push('callout');
  slate.expandedToolbarButtons.push('callout');

  return config;
}
