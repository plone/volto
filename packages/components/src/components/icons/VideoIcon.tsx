import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const VideoIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 12L10 9V15L15 12Z" />
        <path
          fillRule="evenodd"
          d="M2 20V4H22V20H2ZM4 6H20V18H4V6Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
