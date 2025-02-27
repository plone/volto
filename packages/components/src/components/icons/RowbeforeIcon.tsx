import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const RowbeforeIcon = (props: IconPropsWithoutChildren) => {
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
          d="M3 13V3H21V13H3ZM5 5H19V11H5V5Z"
          clipRule="evenodd"
        />
        <path d="M13 19H11V21H13V19ZM15 19H17V21H15V19ZM5 19H3V21H5V19ZM7 19H9V21H7V19ZM21 19H19V21H21V19ZM19 15H21V17H19V15ZM5 15H3V17H5V15Z" />
      </svg>
    </Icon>
  );
};
