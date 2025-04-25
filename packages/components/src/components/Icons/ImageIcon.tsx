import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImageIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M18 10C18 11.1046 17.1046 12 16 12C14.8954 12 14 11.1046 14 10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10Z" />
        <path
          fillRule="evenodd"
          d="M2 20V4H22V20H2ZM4 6H20V17.5857L16.0001 13.5858L14.0001 15.5858L8.00008 9.58582L4 13.5859V6ZM4 16.4143V18H13.5858L8.00008 12.4142L4 16.4143ZM14.4143 18H17.5858L16.0001 16.4142L14.4143 18Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
