import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const WidthLayoutIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M2 9L4 7V17L2 15H22L20 17V7L22 9H2ZM22 7V17H2V7H22Z" />
        <path d="M4 21H20V19H4V21Z" />
        <path d="M4 5H20V3H4V5Z" />
      </svg>
    </Icon>
  );
};
