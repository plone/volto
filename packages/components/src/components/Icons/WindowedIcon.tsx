import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const WindowedIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 9 3 9 3 7 7 7 7 3 9 3 9 9ZM9 15V21H7L7 17H3V15H9ZM21 15H15V21H17V17H21V15ZM15 9V3H17V7H21V9H15ZM12 10C10.8954 10 10 10.8954 10 12 10 13.1046 10.8954 14 12 14 13.1046 14 14 13.1046 14 12 14 10.8954 13.1046 10 12 10Z" />
      </svg>
    </Icon>
  );
};
