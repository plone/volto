import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const TitleIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M16 6H8V10H16V6Z" />
        <path
          fillRule="evenodd"
          d="M4 2L4 22L12 15L20 22V2L4 2ZM18 17.5925L12 12.3425L6 17.5925V4H18V17.5925Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
