import React from 'react';
import type { CheckboxProps as RACCheckboxProps } from 'react-aria-components';
import { Text } from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';

interface CheckboxProps extends RACCheckboxProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function CheckboxField({
  children,
  errorMessage,
  description,
  ...props
}: CheckboxProps) {
  return (
    <div className="react-aria-CheckboxField">
      <Checkbox {...props} />
      {description && <Text slot="description">{description}</Text>}
      {props.isInvalid && <Text slot="errorMessage">{errorMessage}</Text>}
    </div>
  );
}
