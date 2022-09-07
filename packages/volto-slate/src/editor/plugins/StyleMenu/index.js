import React from 'react';
import StyleMenu from './StyleMenu';
import './style.css';

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
  //     icon: (props) => <Icon name={customSVG} size="24px" />,
  //   },
  //   {
  //     cssClass: 'red-inline-text',
  //     label: 'Red Inline Text',
  //     icon: (props) => <Icon name={customSVG1} size="24px" />,
  //   },
  // ];
  // slate.styleMenu.blockStyles = [
  //   {
  //     cssClass: 'underline-block-text',
  //     label: 'Cool Block Text',
  //     icon: (props) => <Icon name={customSVG2} size="24px" />,
  //   },
  //   {
  //     cssClass: 'green-block-text',
  //     label: 'Green Block Text',
  //     icon: (props) => <Icon name={customSVG3} size="24px" />,
  //   },
  // ];

  slate.styleMenu = {
    inlineStyles: [],
    blockStyles: [],
    //themeColors = { primary: 'red' };
  };

  return config;
}
