import React from 'react';
import {
  Label,
  ProgressBar as RACProgressBar,
  ProgressBarProps as RACProgressBarProps,
} from 'react-aria-components';

export interface ProgressBarProps extends RACProgressBarProps {
  label?: string;
}

export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <RACProgressBar {...props}>
      {({ percentage, valueText }) => (
        <>
          <Label>{label}</Label>
          <span className="value">{valueText}</span>
          <div className="bar">
            <div className="fill" style={{ width: percentage + '%' }} />
          </div>
        </>
      )}
    </RACProgressBar>
  );
}
