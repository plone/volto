import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ColumnbeforeIcon = (props: IconPropsWithoutChildren) => {
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
          d="M13 21H3L3 3L13 3V21ZM5 19L5 5H11V19H5Z"
          clipRule="evenodd"
        />
        <path d="M19 11V13H21V11H19ZM19 9V7H21V9H19ZM19 19V21H21V19H19ZM19 17V15H21V17H19ZM19 3V5H21V3L19 3ZM15 5V3L17 3V5H15ZM15 19V21H17V19H15Z" />
      </svg>
    </Icon>
  );
};
