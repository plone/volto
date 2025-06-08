import React from 'react';
import {
  type FieldErrorProps,
  Group,
  type GroupProps,
  type InputProps,
  type LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  type TextProps,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';
import {
  Description as DescriptionBase,
  FieldError as FieldErrorBase,
  Label as LabelBase,
  fieldBorderStyles as fieldBorderStylesBase,
  fieldGroupStyles as fieldGroupStylesBase,
  FieldGroup as FieldGroupBase,
  Input as InputBase,
} from './Field.tailwind';

export function Label(props: LabelProps) {
  return (
    <LabelBase
      {...props}
      className={twMerge('text-quanta-pigeon text-xs', props.className)}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <DescriptionBase
      {...props}
      className={twMerge('text-quanta-pigeon text-xs', props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <FieldErrorBase
      {...props}
      className={composeTailwindRenderProps(props.className, 'text-xs')}
    />
  );
}

// For simplicity, fieldBorderStylesBase are Quanta.
// You could override them with your own styles if needed using the `tv` utility.

export const fieldGroupStyles = tv({
  extend: fieldGroupStylesBase,
  base: 'bg-quanta-air',
  variants: fieldBorderStylesBase.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <FieldGroupBase
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <InputBase
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'text-quanta-space bg-quanta-snow p-3',
      )}
    />
  );
}
