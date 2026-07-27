import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const NewsIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 7H7V9H15V7Z" />
        <path
          fillRule="evenodd"
          d="M15 11V17H7V11H15ZM13 15V13H9V15H13Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M19 3H3V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V15H19V3ZM5 18V5H17V19H6C5.44772 19 5 18.5523 5 18Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
