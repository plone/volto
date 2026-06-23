import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const WidthNarrowIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M4 21H20V19H4V21Z" />
        <path d="M17 7V17H7V7H17ZM9 15H15V9H9V15Z" />
        <path d="M4 5H20V3H4V5Z" />
      </svg>
    </Icon>
  );
};
