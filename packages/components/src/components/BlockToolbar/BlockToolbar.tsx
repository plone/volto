import React from 'react';
import { Toolbar as RACToolbar, ToolbarProps } from 'react-aria-components';
import './BlockToolbar.css';

export function BlockToolbar(props: ToolbarProps) {
  return <RACToolbar {...props} className="blocks-toolbar" />;
}
