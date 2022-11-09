import React from 'react';
import StyleMenu from './StyleMenu';
import './style.less';

export default function install(config) {
  const { slate } = config.settings;
  slate.styleMenu = slate.styleMenu || {};
  slate.styleMenu.inlineStyles = slate.styleMenu.inlineStyles || [];

  slate.styleMenu.inlineStyles = [
    {
      cssClass: 'cool-inline-text',
      label: 'Cool Inline Text',
    },
  ];
  slate.styleMenu.blockStyles = [];
  slate.buttons.styleMenu = (props) => <StyleMenu {...props} title="Styles" />;

  slate.toolbarButtons.push('styleMenu');
  slate.expandedToolbarButtons.push('styleMenu');

  // slate.styleMenu = {
  //   blockStyles: [],
  // };

  return config;
}
