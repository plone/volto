import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ReviewIcon = (props: IconPropsWithoutChildren) => {
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
          d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V20H6C3.79086 20 2 18.2091 2 16V8ZM6 6H18C19.1046 6 20 6.89543 20 8V18H6C4.89543 18 4 17.1046 4 16V8C4 6.89543 4.89543 6 6 6Z"
          clipRule="evenodd"
        />
        <path d="M12.9258 10.7258L12.0001 8.5L11.0743 10.7258L8.67139 10.9184L10.5022 12.4867L9.94284 14.8316L12.0001 13.575L14.0573 14.8316L13.498 12.4867L15.3288 10.9184L12.9258 10.7258Z" />
      </svg>
    </Icon>
  );
};
