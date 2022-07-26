// import React from 'react';
import { withAutoformat } from './extensions';
import { autoformatRules } from './constants';
// import PluginSidebar from '@plone/volto-slate/blocks/Text/PluginSidebar';

export default function install(config) {
  const { slate } = config.settings;

  slate.extensions = [
    ...(slate.extensions || []),
    withAutoformat({ rules: autoformatRules }),
  ];

  // TODO: this way the markdown shortcuts' explanation appears
  // only when one of the toolbars is visible, so I commented this out:
  // slate.buttons.markdownSupport = (props) => (
  //   <PluginSidebar selected={true}>
  //     <strong>Markdown</strong>
  //   </PluginSidebar>
  // );
  // slate.toolbarButtons = [...(slate.toolbarButtons || []), 'markdownSupport'];
  // slate.expandedToolbarButtons = [
  //   ...(slate.expandedToolbarButtons || []),
  //   'markdownSupport',
  // ];

  return config;
}
