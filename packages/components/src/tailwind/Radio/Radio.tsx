import React from 'react';

import type {
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
  ValidationResult,
} from 'react-aria-components';
import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { composeTailwindRenderProps } from '../utils';
import { Description, FieldError, Label } from '../Field/Field';

interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  label?: string;
  children?: React.ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  ref?: React.Ref<HTMLDivElement>;
}

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <AriaRadioGroup
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
    </AriaRadioGroup>
  );
};

const radioStyles = tv({
  base: 'bg-muted size-4 shrink-0 rounded-full border transition',
  variants: {
    isSelected: {
      false: 'border-input',
      true: 'border-primary border-[4.5px]',
    },
    isFocused: {
      true: [
        'border-ring bg-primary/20 ring-primary/20 ring-4',
        'group-invalid:border-danger/70 group-invalid:bg-danger/20 group-invalid:ring-danger/20',
      ],
    },
    isInvalid: {
      true: 'border-danger/70 bg-danger/20 text-red-700',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
});

const radioBaseStyles = tv({
  base: 'group flex items-center gap-2 text-sm transition [&[data-disabled]]:opacity-50',
});

interface RadioProps extends AriaRadioProps {
  description?: string;
  label?: string;
  ref?: React.Ref<HTMLLabelElement>;
}

const Radio = (props: RadioProps) => {
  return (
    <AriaRadio
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        radioBaseStyles({ ...renderProps, className }),
      )}
    >
      {(renderProps) => (
        <div className="flex gap-2">
          <div
            className={radioStyles({
              ...renderProps,
              className: 'description' in props ? 'mt-1' : 'mt-0.5',
            })}
          />
          <div className="flex flex-col gap-1">
            {props.label || props.description ? (
              <>
                {<Label>{props.label}</Label>}
                {props.description && (
                  <Description>{props.description}</Description>
                )}
              </>
            ) : (
              (props.children as React.ReactNode)
            )}
          </div>
        </div>
      )}
    </AriaRadio>
  );
};

export type { RadioGroupProps, RadioProps };
export { Radio, RadioGroup };
