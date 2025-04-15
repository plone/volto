import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImageleftIcon = (props: IconPropsWithoutChildren) => {
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
          d="M2 5V15H14V5H2ZM12 7H4V13H12V7Z"
          clipRule="evenodd"
        />
        <path d="M22 17V19H2V17H22ZM22 5H16V7H22V5ZM16 9H22V11H16V9ZM22 13H16V15H22V13Z" />
      </svg>
    </Icon>
  );
};
