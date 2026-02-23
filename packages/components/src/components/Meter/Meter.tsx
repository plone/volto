import React from 'react';
import {
  Label,
  Meter as RACMeter,
  type MeterProps as RACMeterProps,
} from 'react-aria-components';

export interface MeterProps extends RACMeterProps {
  label?: string;
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <RACMeter {...props}>
      {({ percentage, valueText }) => (
        <>
          <Label>{label}</Label>
          <span className="value">{valueText}</span>
          <div className="bar">
            <div className="fill" style={{ width: percentage + '%' }} />
          </div>
        </>
      )}
    </RACMeter>
  );
}
