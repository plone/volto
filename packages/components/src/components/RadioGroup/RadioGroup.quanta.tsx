import React, { type ReactNode } from 'react';
import {
  composeRenderProps,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { Description, FieldError, Label } from '../Field/Field.quanta';

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-2',
      )}
    >
      <Label>{props.label}</Label>
      <div className="group-orientation-vertical:flex-col group-orientation-horizontal:gap-4 flex gap-2">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

const styles = tv({
  extend: focusRing,
  base: 'h-5 w-5 rounded-full border-2 bg-white transition-all dark:bg-zinc-900',
  variants: {
    isSelected: {
      false:
        'group-pressed:border-gray-500 dark:group-pressed:border-zinc-300 border-gray-400 dark:border-zinc-400',
      true: 'group-pressed:border-gray-800 dark:group-pressed:border-slate-200 border-[7px] border-gray-700 dark:border-slate-300 forced-colors:border-[Highlight]!',
    },
    isInvalid: {
      true: 'group-pressed:border-red-800 dark:group-pressed:border-red-700 border-red-700 dark:border-red-600 forced-colors:border-[Mark]!',
    },
    isDisabled: {
      true: 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]!',
    },
  },
});

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex items-center gap-2 text-sm text-gray-800 transition disabled:text-gray-300 dark:text-zinc-200 dark:disabled:text-zinc-600 forced-colors:disabled:text-[GrayText]',
      )}
    >
      {(renderProps) => (
        <>
          <div className={styles(renderProps)} />
          {props.children}
        </>
      )}
    </RACRadio>
  );
}

const customRadioButton = tv({
  extend: focusRing,
  base: 'text-quanta-iron flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-medium transition hover:shadow-sm focus:shadow-sm active:shadow-md',
  variants: {
    isSelected: {
      false:
        'bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-snow',
      true: 'pressed:bg-quanta-cobalt bg-quanta-air hover:bg-quanta-snow active:bg-quanta-silver focus:bg-quanta-snow border border-gray-200 shadow-sm',
    },
    isPressed: {
      true: 'pressed:bg-quanta-cobalt',
    },
    isInvalid: {
      true: 'border border-red-700 text-red-700 dark:border-red-600 dark:text-red-600',
    },
    isDisabled: {
      true: 'text-quanta-smoke',
    },
  },
});
export function CustomRadio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        customRadioButton({
          ...renderProps,
          className,
        }),
      )}
    >
      {props.children}
    </RACRadio>
  );
}
