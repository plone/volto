import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ChevronrightIcon = (props: IconPropsWithoutChildren) => {
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
          d="M9.70718 18.7072L8.29297 17.293L13.5859 12.0001L8.29297 6.70718L9.70718 5.29297L16.4143 12.0001L9.70718 18.7072Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
