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
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

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
      false: `
        border-gray-300
        forced-colors:border-[ButtonBorder]
      `,
      true: `
        inset-ring-2 inset-ring-quanta-sapphire outline-2
        group-data-readonly:inset-ring-0
        forced-colors:border-[Highlight]
      `,
    },
    isInvalid: {
      true: `
        bg-quanta-ballet outline-2
        hover:bg-quanta-flamingo
        focus:inset-ring-2 focus:inset-ring-quanta-candy
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
    group flex h-9 items-center overflow-hidden rounded-lg border-2 bg-quanta-air
    forced-colors:bg-[Field]
  `,
  variants: fieldBorderStyles.variants,
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

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `
          min-w-0 flex-1 bg-quanta-snow p-3 text-sm text-quanta-space outline
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
