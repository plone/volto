import React from 'react';
import { defineMessages } from 'react-intl';
import StyleMenu from './StyleMenu';
import './style.less';

const messages = defineMessages({
  styles: {
    id: 'Styles',
    defaultMessage: 'Styles',
  },
});

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.styleMenu = (props) => (
    <StyleMenu {...props} title={messages.styles} />
  );

  slate.toolbarButtons.push('styleMenu');
  slate.expandedToolbarButtons.push('styleMenu');

  slate.styleMenu = {
    inlineStyles: [],
    blockStyles: [],
  };

  return config;
}
