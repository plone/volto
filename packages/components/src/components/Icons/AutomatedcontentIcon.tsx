import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const AutomatedcontentIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20 8C18.8954 8 18 7.10457 18 6 18 4.89543 18.8954 4 20 4 21.1046 4 22 4.89543 22 6 22 7.10457 21.1046 8 20 8ZM18 12C18 13.1046 18.8954 14 20 14 21.1046 14 22 13.1046 22 12 22 10.8954 21.1046 10 20 10 18.8954 10 18 10.8954 18 12ZM18 18C18 19.1046 18.8954 20 20 20 21.1046 20 22 19.1046 22 18 22 16.8954 21.1046 16 20 16 18.8954 16 18 16.8954 18 18ZM16 5 10 5V19H16V17H12V13L16 13V11L12 11V7H16V5ZM5.5 8.5 2 12 5.5 15.5 9 12 5.5 8.5Z" />
      </svg>
    </Icon>
  );
};
