import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const SpacerIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M4 4V2H20V4H4ZM16.7072 9.29286 12.0001 4.58575 7.29297 9.29286 8.70718 10.7071 11 8.41426 11 15.5858 8.70703 13.2928 7.29282 14.707 11.9999 19.4141 16.707 14.707 15.2928 13.2928 13 15.5856 13 8.41411 15.293 10.7071 16.7072 9.29286ZM4 20V22H20V20H4Z" />
      </svg>
    </Icon>
  );
};
