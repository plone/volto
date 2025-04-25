import React from 'react';
import {
  Toolbar as RACToolbar,
  type ToolbarProps,
} from 'react-aria-components';

export function BlockToolbar(props: ToolbarProps) {
  return <RACToolbar {...props} className="blocks-toolbar" />;
}
