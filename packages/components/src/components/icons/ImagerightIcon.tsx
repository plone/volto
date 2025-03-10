import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImagerightIcon = (props: IconPropsWithoutChildren) => {
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
          d="M10 5V15H22V5H10ZM20 7H12V13H20V7Z"
          clipRule="evenodd"
        />
        <path d="M22 17V19H2V17H22ZM8 5H2V7H8V5ZM2 9H8V11H2V9ZM8 13H2V15H8V13Z" />
      </svg>
    </Icon>
  );
};
