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
        'group-data-disabled:text-quanta-silver group-data-invalid:text-quanta-candy not-group-data-invalid:not-group-data-readonly:has-[+input:focus]:text-quanta-sapphire text-quanta-pigeon after:bg-quanta-candy w-fit cursor-default text-xs font-medium group-data-required:after:mx-1 group-data-required:after:inline-block group-data-required:after:h-2 group-data-required:after:w-2 group-data-required:after:rounded-4xl',
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
        'text-quanta-pigeon group-data-disabled:text-quanta-silver text-xs font-normal',
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
        'text-quanta-candy text-xs font-normal forced-colors:text-[Mark]',
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-gray-300 forced-colors:border-[ButtonBorder]',
      true: 'inset-ring-quanta-sapphire inset-ring-2 outline-2 group-data-readonly:inset-ring-0 forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'bg-quanta-ballet hover:bg-quanta-flamingo focus:inset-ring-quanta-candy outline-2 focus:inset-ring-2 forced-colors:border-[Mark]',
    },
    isDisabled: {
      true: 'bg-quanta-air hover:bg-quanta-air text-quanta-silver forced-colors:border-[GrayText]',
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: 'group bg-quanta-air flex h-9 items-center overflow-hidden rounded-lg border-2 forced-colors:bg-[Field]',
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
        'text-quanta-space bg-quanta-snow hover:bg-quanta-smoke disabled:text-quanta-silver read-only:hover:bg-quanta-air read-only:bg-quanta-air focus:bg-quanta-air active:bg-quanta-air min-w-0 flex-1 p-3 text-sm outline read-only:border-1 read-only:border-dashed disabled:cursor-not-allowed',
      )}
    />
  );
}
