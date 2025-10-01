import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const SliderIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M19.4141 9.99995 16.707 12.7071 15.2927 11.2928 16.5856 9.99995 15.2927 8.70706 16.707 7.29285 19.4141 9.99995ZM7.29304 7.29282 4.58594 9.99992 7.29304 12.707 8.70726 11.2928 7.41436 9.99992 8.70726 8.70703 7.29304 7.29282Z" />
        <path
          fillRule="evenodd"
          d="M2 16V4H22V16H2ZM4 6H20V14H4V6Z"
          clipRule="evenodd"
        />
        <path d="M20 18H4V20H20V18Z" />
      </svg>
    </Icon>
  );
};
