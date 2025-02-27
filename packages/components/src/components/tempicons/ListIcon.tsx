import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ListIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M2 6C2 4.89542 2.89545 4 4 4 5.10455 4 6 4.89542 6 6 6 7.10455 5.10455 8 4 8 2.89545 8 2 7.10455 2 6ZM22 5H8V7H22V5ZM22 11H8V13H22V11ZM8 17H22V19H8V17ZM4 10C2.89545 10 2 10.8954 2 12 2 13.1046 2.89545 14 4 14 5.10455 14 6 13.1046 6 12 6 10.8954 5.10455 10 4 10ZM4 16C2.89545 16 2 16.8954 2 18 2 19.1046 2.89545 20 4 20 5.10455 20 6 19.1046 6 18 6 16.8954 5.10455 16 4 16Z" />
      </svg>
    </Icon>
  );
};
