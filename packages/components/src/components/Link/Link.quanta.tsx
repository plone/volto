import React from 'react';
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { button } from '../Button/Button.quanta.variants';
import { link } from './Link.quanta.variants';

type LinkVariants = Parameters<typeof link>[0];

type LinkProps = AriaLinkProps &
  LinkVariants & {
    asButton?: never;
  };

type ButtonVariants = Parameters<typeof button>[0];

type LinkAsButtonProps = AriaLinkProps &
  ButtonVariants & {
    asButton: true;
  };

export function Link(props: LinkProps | LinkAsButtonProps) {
  const { asButton, variant, ...linkProps } = props;

  return (
    <AriaLink
      {...linkProps}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => {
          if (asButton) {
            return button({
              ...renderProps,
              className,
              variant,
              size: props.size,
              accent: props.accent,
            });
          }
          return link({ ...renderProps, className, variant });
        },
      )}
    />
  );
}
