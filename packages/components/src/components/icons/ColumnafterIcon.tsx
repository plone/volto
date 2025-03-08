import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ColumnafterIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M3 11L3 13H5L5 11H3Z" />
        <path
          fillRule="evenodd"
          d="M21 21H11V3L21 3V21ZM13 19V5H19V19H13Z"
          clipRule="evenodd"
        />
        <path d="M3 9 3 7H5V9H3ZM3 19 3 21H5V19H3ZM3 17 3 15H5V17H3ZM3 3 3 5H5V3L3 3ZM7 5V3L9 3V5H7ZM7 19V21H9V19H7Z" />
      </svg>
    </Icon>
  );
};
