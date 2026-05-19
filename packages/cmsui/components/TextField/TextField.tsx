import React from 'react';
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
} from '../Field/Field';
import { composeTailwindRenderProps, focusRing } from '../utils';

const inputStyles = tv({
  extend: focusRing,
  base: 'rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  minValue?: number;
}

export function TextField({
  label,
  description,
  errorMessage,
  minValue,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} min={minValue} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
