import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const LinkIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 7V10H17V7C17 4.23858 14.7614 2 12 2 9.23858 2 7 4.23858 7 7V10H9V7C9 5.34315 10.3431 4 12 4 13.6569 4 15 5.34315 15 7ZM15 17V14H17V17C17 19.7614 14.7614 22 12 22 9.23858 22 7 19.7614 7 17V14H9V17C9 18.6569 10.3431 20 12 20 13.6569 20 15 18.6569 15 17Z" />
        <path d="M13 8H11V16H13V8Z" />
      </svg>
    </Icon>
  );
};
