import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const CalendarIcon = (props: IconPropsWithoutChildren) => {
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
          d="M7 2V4H3V21H21V4H17V2H15V4H9V2H7ZM19 6V8H5V6H19ZM5 10V19H19V10H5Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
