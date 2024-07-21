import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ThumbnailsIcon = (props: IconPropsWithoutChildren) => {
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
          d="M3 11V3H11V11H3ZM5 5H9V9H5V5ZM13 11V3H21V11H13ZM15 5H19V9H15V5ZM3 13V21H11V13H3ZM9 15H5V19H9V15ZM13 21V13H21V21H13ZM15 15H19V19H15V15Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
