import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ForegroundIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeWidth="2"
          d="M3.74844 19L12.0002 4.97231L20.2516 19H3.74844Z"
        />
      </svg>
    </Icon>
  );
};
