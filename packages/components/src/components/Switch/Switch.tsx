import React from 'react';
import {
  Switch as RACSwitch,
  type SwitchProps as RACSwitchProps,
} from 'react-aria-components';

export interface SwitchProps extends Omit<RACSwitchProps, 'children'> {
  children: React.ReactNode;
}

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <RACSwitch {...props}>
      <div className="indicator" />
      {children}
    </RACSwitch>
  );
}
