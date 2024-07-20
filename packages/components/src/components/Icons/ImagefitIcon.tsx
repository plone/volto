import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImagefitIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20 3H4V5H20V3Z" />
        <path
          fillRule="evenodd"
          d="M4 7V17H20V7H4ZM18 9H6V15H18V9Z"
          clipRule="evenodd"
        />
        <path d="M4 19H20V21H4V19Z" />
      </svg>
    </Icon>
  );
};
