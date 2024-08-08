import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const HighlightIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 7H15V9H13V13H11V9H9V7Z" />
        <path
          fillRule="evenodd"
          d="M3 17V3H21V17H3ZM5 5H19V15H5V5Z"
          clipRule="evenodd"
        />
        <path d="M19 19H5V21H19V19Z" />
      </svg>
    </Icon>
  );
};
