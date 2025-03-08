import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const FooterIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M16 16H8V18H16V16Z" />
        <path
          fillRule="evenodd"
          d="M4 22V2H20V22H4ZM6 4H18V20H6V4Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
