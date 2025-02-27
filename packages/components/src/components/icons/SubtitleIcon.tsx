import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const SubtitleIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M14 10H10V12H14V10Z" />
        <path
          fillRule="evenodd"
          d="M6 4V20L12 15L18 20V4H6ZM16 6V15.7299L12 12.3966L8 15.7299V6H16Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
