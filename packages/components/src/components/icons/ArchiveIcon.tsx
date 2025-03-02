import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ArchiveIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M8 13H16V11H8V13Z" />
        <path
          fillRule="evenodd"
          d="M3 3H21V9H20V21H4V9H3V3ZM6 9H18V19H6V9ZM19 5V7H5V5H19Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
