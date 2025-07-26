import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImagenarrowIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 9L8 7V17L7 15H17L16 17V7L17 9H7ZM17 7V12V14V16V17H7V7H17Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5 21H19V19H5V21Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5 5H19V3H5V5Z" />
      </svg>
    </Icon>
  );
};
