import React from 'react';
import StyleMenu from './StyleMenu';
import './style.css';

export default function install(config) {
  const { slate } = config.settings;

  slate.buttons.styleMenu = (props) => <StyleMenu {...props} title="Styles" />;

  slate.toolbarButtons.push('styleMenu');
  slate.expandedToolbarButtons.push('styleMenu');
  slate.styleMenu = config.settings.slate.styleMenu || {};
  slate.styleMenu.inlineStyles = [
    { cssClass: 'cool-inline-text', label: 'Cool Inline Text' },
    { cssClass: 'red-inline-text', label: 'Red Inline Text' },
  ];
  // The style menu definitions are set in the arrays that follow (from any
  // addon). Examples:
  // config.settings.slate = config.settings.slate || {};
  // slate.styleMenu = config.settings.slate.styleMenu || {};
  // slate.styleMenu.inlineStyles = [
  //   { cssClass: 'cool-inline-text', label: 'Cool Inline Text' },
  //   { cssClass: 'red-inline-text', label: 'Red Inline Text' },
  // ];
  // config.settings.slate.styleMenu.blockStyles = [
  //   ...config.settings.slate.styleMenu.blockStyles,
  //   { cssClass: 'green-block-text', label: 'Green Text' },
  //   { cssClass: 'underline-block-text', label: 'Underline Text' },
  // ];
  // slate.styleMenu = {
  //   inlineStyles: [],
  //   blockStyles: [],
  // };

  return config;
}
