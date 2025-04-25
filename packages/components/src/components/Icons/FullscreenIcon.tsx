import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const FullscreenIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M21 3V9H19V5L15 5V3L21 3ZM3 3H9V5H5V9H3V3ZM3 21V15H5V19H9V21H3ZM15 21H21V15H19V19H15V21ZM12 10C10.8954 10 10 10.8954 10 12 10 13.1046 10.8954 14 12 14 13.1046 14 14 13.1046 14 12 14 10.8954 13.1046 10 12 10Z" />
      </svg>
    </Icon>
  );
};
