import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const InfoIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M13 16H14V18H10V16H11V12H10V10H13V16ZM12 5.5C11.1716 5.5 10.5 6.17157 10.5 7 10.5 7.82843 11.1716 8.5 12 8.5 12.8284 8.5 13.5 7.82843 13.5 7 13.5 6.17157 12.8284 5.5 12 5.5Z" />
        <path
          fillRule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
