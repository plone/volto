import React from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { button } from './Button.quanta.variants';
import { link } from '../Link/Link.quanta.variants';

type ButtonVariants = Parameters<typeof button>[0];

export type ButtonProps = RACButtonProps &
  ButtonVariants & {
    asLink?: never;
  };

type LinkVariants = Parameters<typeof link>[0];

type ButtonAsLinkProps = RACButtonProps &
  LinkVariants & {
    asLink: true;
  };

export function Button(props: ButtonProps | ButtonAsLinkProps) {
  const { asLink, variant, ...buttonProps } = props;

  return (
    <RACButton
      {...buttonProps}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => {
          if (asLink) {
            return link({
              ...renderProps,
              className,
              variant,
            });
          }
          return button({
            ...renderProps,
            variant,
            size: props.size,
            accent: props.accent,
            className,
          });
        },
      )}
    />
  );
}
