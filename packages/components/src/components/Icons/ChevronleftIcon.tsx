import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ChevronleftIcon = (props: IconPropsWithoutChildren) => {
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
          d="M14.293 18.7072L15.7073 17.293L10.4144 12.0001L15.7073 6.70718L14.293 5.29297L7.58594 12.0001L14.293 18.7072Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
