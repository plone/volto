import React from 'react';
import {
  Label,
  Meter as AriaMeter,
  MeterProps as AriaMeterProps,
} from 'react-aria-components';

export interface MeterProps extends AriaMeterProps {
  label?: string;
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <AriaMeter {...props}>
      {({ percentage, valueText }) => (
        <>
          <Label>{label}</Label>
          <span className="value">{valueText}</span>
          <div className="bar">
            <div className="fill" style={{ width: percentage + '%' }} />
          </div>
        </>
      )}
    </AriaMeter>
  );
}
