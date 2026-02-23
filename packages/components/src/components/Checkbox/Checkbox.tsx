import React from 'react';
import {
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';

interface CheckboxProps extends RACCheckboxProps {
  label?: string;
}

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <RACCheckbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {props.label || children}
        </>
      )}
    </RACCheckbox>
  );
}
