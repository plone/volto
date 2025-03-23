import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const RedoIcon = (props: IconPropsWithoutChildren) => {
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
          d="M18.9998 6.34195C16.2646 2.94959 11.3917 1.95918 7.49955 4.2063C3.19492 6.69158 1.72004 12.1959 4.20532 16.5005C6.69065 20.805 12.1955 22.2794 16.5001 19.7942L15.5001 18.0621C12.1521 19.9951 7.87093 18.848 5.93794 15.5C4.00509 12.1519 5.15156 7.87131 8.49955 5.93835C11.6749 4.10503 15.6897 5.04236 17.7444 8.00024H14.9998V10.0002H20.9998V4.00024H18.9998V6.34195ZM18.9282 8.00024H18.9998V7.95891L18.9282 8.00024Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
