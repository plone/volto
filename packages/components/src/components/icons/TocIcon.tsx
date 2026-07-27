import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const TocIcon = (props: IconPropsWithoutChildren) => {
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
          d="M16 5H2V7H16V5ZM16 11H2V13H16V11ZM2 17H16V19H2V17ZM18 5H22V7H18V5ZM22 11H18V13H22V11ZM18 17H22V19H18V17Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
