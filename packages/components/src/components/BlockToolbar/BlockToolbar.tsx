import React from 'react';
import { Toolbar as RACToolbar, ToolbarProps } from 'react-aria-components';

export function BlockToolbar(props: ToolbarProps) {
  return <RACToolbar {...props} className="blocks-toolbar" />;
}
