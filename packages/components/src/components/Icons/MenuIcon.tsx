import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const MenuIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M21 7H3V5H21V7ZM21 13H3V11H21V13ZM3 19H21V17H3V19Z" />
      </svg>
    </Icon>
  );
};
