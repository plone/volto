import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ChevronupIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentcolor"
          d="M18.707 14.2928L17.2928 15.707L11.9999 10.4141L6.70703 15.707L5.29282 14.2928L11.9999 7.58571L18.707 14.2928Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
