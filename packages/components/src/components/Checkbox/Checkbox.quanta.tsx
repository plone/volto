import React, { type ReactNode } from 'react';
import { CheckboxIcon, DashIcon } from '../../components/icons';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type CheckboxProps,
  type ValidationResult,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from '../Field/Field.quanta';
import { composeTailwindRenderProps, focusRing } from '../utils';

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-2',
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: 'group flex items-center gap-2 text-sm transition',
  variants: {
    isDisabled: {
      false: 'text-quanta-cobalt',
      true: `
        text-quanta-iron
        forced-colors:text-[GrayText]
      `,
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: 'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition',
  variants: {
    isSelected: {
      false: `
        border-quanta-pigeon bg-quanta-snow
        group-pressed:border-quanta-silver
      `,
      true: `
        border-quanta-sapphire bg-quanta-sapphire
        group-pressed:border-quanta-sapphire
        forced-colors:![--color:Highlight]
      `,
    },
    isInvalid: {
      true: `
        group-pressed:border-quanta-ruby
        border-quanta-ruby
        forced-colors:![--color:Mark]
      `,
    },
    isDisabled: {
      true: `
        border-quanta-silver bg-quanta-smoke
        forced-colors:![--color:GrayText]
      `,
    },
  },
});

const iconStyles =
  'w-4 h-4 text-white group-disabled:text-quanta-iron forced-colors:text-[HighlightText]';

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
            })}
          >
            {isIndeterminate ? (
              <DashIcon aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <CheckboxIcon aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}
