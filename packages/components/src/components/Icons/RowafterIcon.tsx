import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const RowafterIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M13 3H11V5H13V3Z" />
        <path
          fillRule="evenodd"
          d="M3 21V11H21V21H3ZM5 13H19V19H5V13Z"
          clipRule="evenodd"
        />
        <path d="M15 3H17V5H15V3ZM5 3H3V5H5V3ZM7 3H9V5H7V3ZM21 3H19V5H21V3ZM19 7H21V9H19V7ZM5 7H3V9H5V7Z" />
      </svg>
    </Icon>
  );
};
