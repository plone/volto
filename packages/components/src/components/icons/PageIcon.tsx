import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const PageIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M20 7L15 2H4V22H20V7ZM18 8.00003V20H6V4H14C14 4.00001 14 3.99999 14 4V8.00003H18Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
