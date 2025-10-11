import React from 'react';
import {
  type FieldErrorProps,
  Group,
  type GroupProps,
  type InputProps,
  type LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  type TextProps,
  composeRenderProps,
  useRenderProps,
  FieldErrorContext,
  LabelContext,
  Provider,
  GroupContext,
  TextContext,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing, useSlot } from '../utils';
import { useField } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        `
          w-fit cursor-default text-xs font-medium text-quanta-pigeon
          group-data-disabled:text-quanta-silver
          group-data-invalid:text-quanta-candy
          after:bg-quanta-candy
          group-data-required:after:mx-1 group-data-required:after:inline-block
          group-data-required:after:h-2 group-data-required:after:w-2
          group-data-required:after:rounded-4xl
          not-group-data-invalid:not-group-data-readonly:has-[+input:focus]:text-quanta-sapphire
        `,
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge(
        `
          text-xs font-normal text-quanta-pigeon
          group-data-disabled:text-quanta-silver
        `,
        props.className,
      )}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `
          text-xs font-normal text-quanta-candy
          forced-colors:text-[Mark]
        `,
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: `forced-colors:border-[ButtonBorder]`,
      true: `
        bg-quanta-air inset-ring-quanta-sapphire outline-2
        group-data-readonly:inset-ring-0
        hover:bg-quanta-air
        forced-colors:border-[Highlight]
      `,
    },
    isInvalid: {
      true: `
        bg-quanta-ballet outline-2
        hover:bg-quanta-flamingo
        focus:inset-ring-quanta-candy
        forced-colors:border-[Mark]
      `,
    },
    isDisabled: {
      true: `
        bg-quanta-air text-quanta-silver
        hover:bg-quanta-air
        forced-colors:border-[GrayText]
      `,
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: `
    group flex h-11 items-center overflow-hidden rounded-lg bg-quanta-snow text-quanta-space
    hover:bg-quanta-smoke
    read-only:hover:bg-quanta-air
    focus:bg-quanta-air
    active:bg-quanta-air
    forced-colors:bg-[Field]
  `,
  variants: {
    ...fieldBorderStyles.variants,
    isFocusWithin: {
      ...fieldBorderStyles.variants.isFocusWithin,
      true: twMerge(
        fieldBorderStyles.variants.isFocusWithin.true,
        `inset-ring-2`,
      ),
    },
    isInvalid: {
      ...fieldBorderStyles.variants.isInvalid,
      true: twMerge(
        fieldBorderStyles.variants.isInvalid.true,
        `focus:inset-ring-2`,
      ),
    },
  },
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export const inputStyles = tv({
  extend: focusRing,
  base: 'rounded-md p-3',
  variants: {
    isFocused: {
      ...fieldBorderStyles.variants.isFocusWithin,
      true: twMerge(
        fieldBorderStyles.variants.isFocusWithin.true,
        `inset-ring-2`,
      ),
    },
    isInvalid: {
      ...fieldBorderStyles.variants.isInvalid,
      true: twMerge(
        fieldBorderStyles.variants.isInvalid.true,
        `focus:inset-ring-2`,
      ),
    },
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `
          min-w-0 flex-1 bg-quanta-snow px-2 py-1.5 text-sm text-quanta-space outline
          not-group-data-focus-within:outline-0
          group-data-focus-within:outline-0
          group-data-hovered:bg-quanta-smoke
          read-only:border-1 read-only:border-dashed read-only:bg-quanta-air
          hover:bg-quanta-smoke
          read-only:hover:bg-quanta-air
          focus:bg-quanta-air
          active:bg-quanta-air
          disabled:cursor-not-allowed disabled:text-quanta-silver
        `,
      )}
    />
  );
}

type FieldWrapperProps = {
  wrapped?: boolean;
  children: React.ReactNode;
  className?: string;
  isRequired?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  isFocused?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  slot?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Field = React.forwardRef<HTMLDivElement, FieldWrapperProps>(
  (props: FieldWrapperProps, ref) => {
    // TODO: Determine if the use case of handling the case where both 'aria-label'
    // and 'aria-labelledby' are provided, like the TextField component does.
    // Probably not needed here, but worth considering for consistency.
    const [labelRef] = useSlot(
      !props['aria-label'] && !props['aria-labelledby'],
    );

    // TODO: FieldProps is not used in the current implementation, but it can be
    // useful in the future to pass down additional props to the wrapped field.
    const { labelProps, descriptionProps, errorMessageProps } = useField({
      ...props,
      isInvalid: props.isInvalid || false,
      errorMessage: props.errorMessage,
    });

    const renderProps = useRenderProps({
      ...props,
      values: {
        isDisabled: props.isDisabled || false,
        isInvalid: props.isInvalid || false,
        isReadOnly: props.isReadOnly || false,
        isRequired: props.isRequired || false,
      },
      defaultClassName: 'react-aria-Field',
    });
    const DOMProps = filterDOMProps(props);

    return (
      <div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-disabled={props.isDisabled || undefined}
        data-invalid={props.isInvalid || undefined}
        data-readonly={props.isReadOnly || undefined}
        data-required={props.isRequired || undefined}
      >
        <Provider
          values={[
            [LabelContext, { ...labelProps, ref: labelRef }],
            [
              GroupContext,
              {
                role: 'presentation',
                isInvalid: props.isInvalid || false,
                isDisabled: props.isDisabled || false,
              },
            ],
            [
              TextContext,
              {
                slots: {
                  description: descriptionProps,
                  errorMessage: errorMessageProps,
                },
              },
            ],
            [
              FieldErrorContext,
              {
                isInvalid: props.isInvalid || false,
                validationErrors: props.errorMessage
                  ? [props.errorMessage]
                  : [],
                // @ts-expect-error We won't use validationDetails in this context
                validationDetails: null,
              },
            ],
          ]}
        >
          {renderProps.children}
        </Provider>
      </div>
    );
  },
);

Field.displayName = 'Field';

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { wrapped = true, children, label, description, errorMessage } = props;

  return wrapped ? (
    <Field
      {...props}
      className={twMerge(props.className, 'group flex flex-col gap-1')}
    >
      {label && <Label>{label}</Label>}
      {children}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field>
  ) : (
    <>{children}</>
  );
};
