import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const CheckboxIcon = (props: IconPropsWithoutChildren) => {
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
          d="M18.4395 5.25928L20.5608 7.3806L9.50011 18.4413L3.43945 12.3806L5.56077 10.2593L9.50011 14.1986L18.4395 5.25928Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
