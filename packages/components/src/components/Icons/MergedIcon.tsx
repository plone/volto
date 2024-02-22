import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const MergedIcon = (props: IconPropsWithoutChildren) => {
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
          d="M3 21V3H21V21H3ZM5 5H19V19H5V5Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
