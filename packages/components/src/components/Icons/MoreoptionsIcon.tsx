import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const MoreoptionsIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7 12.0001C7 13.1046 6.10457 14.0001 5 14.0001 3.89543 14.0001 3 13.1046 3 12.0001 3 10.8955 3.89543 10.0001 5 10.0001 6.10457 10.0001 7 10.8955 7 12.0001ZM14 11.9724C14 13.077 13.1046 13.9724 12 13.9724 10.8954 13.9724 10 13.077 10 11.9724 10 10.8678 10.8954 9.97241 12 9.97241 13.1046 9.97241 14 10.8678 14 11.9724ZM19.0002 14.0001C20.1048 14.0001 21.0002 13.1046 21.0002 12.0001 21.0002 10.8955 20.1048 10.0001 19.0002 10.0001 17.8956 10.0001 17.0002 10.8955 17.0002 12.0001 17.0002 13.1046 17.8956 14.0001 19.0002 14.0001Z" />
      </svg>
    </Icon>
  );
};
