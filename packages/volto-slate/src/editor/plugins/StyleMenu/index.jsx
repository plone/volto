import React from 'react';
import StyleMenu from './StyleMenu';
import './style.less';

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.styleMenu = (props) => <StyleMenu {...props} title="Styles" />;

  slate.toolbarButtons.push('styleMenu');
  slate.expandedToolbarButtons.push('styleMenu');

  slate.styleMenu = {
    inlineStyles: [],
    blockStyles: [],
  };

  return config;
}
