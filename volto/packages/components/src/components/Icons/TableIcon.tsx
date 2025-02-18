import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const TableIcon = (props: IconPropsWithoutChildren) => {
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
          d="M3 3V21H21V3H3ZM11 5H5V11H11V5ZM13 5V11H19V5H13ZM11 13H5V19H11V13ZM13 19V13H19V19H13Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
