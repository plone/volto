import React from 'react';
import StyleMenu from './StyleMenu';
import './style.less';

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.styleMenu = (props) => <StyleMenu {...props} title="Styles" />;

  slate.toolbarButtons.push('styleMenu');
  slate.expandedToolbarButtons.push('styleMenu');

  /* The slate Menu configuration in an addon */

  // slate.styleMenu = config.settings.slate.styleMenu || {};
  // slate.styleMenu.inlineStyles = [
  //   {
  //     cssClass: 'cool-inline-text',
  //     label: 'Cool Inline Text',
  //     icon: (props) => <Icon name={paintSVG} size="24px" />,
  //   },
  // ];
  // slate.styleMenu.blockStyles = [
  //   {
  //     cssClass: 'underline-block-text',
  //     label: 'Cool Block Text',
  //     icon: (props) => <Icon name={paintSVG} size="24px" />,
  //   },
  // ];

  slate.styleMenu = {
    inlineStyles: [],
    blockStyles: [],
  };

  return config;
}
