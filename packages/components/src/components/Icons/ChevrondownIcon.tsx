import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ChevrondownIcon = (props: IconPropsWithoutChildren) => {
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
          d="M5.29297 9.70718L6.70718 8.29297L12.0001 13.5859L17.293 8.29297L18.7072 9.70718L12.0001 16.4143L5.29297 9.70718Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
