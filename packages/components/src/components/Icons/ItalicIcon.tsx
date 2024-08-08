import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ItalicIcon = (props: IconPropsWithoutChildren) => {
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
          d="M10 3H17V5H14.3584L11.4443 19H14V21L11.028 21H9L7 21V19H9.4163L12.3304 5H10V3Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
