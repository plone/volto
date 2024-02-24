import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const RowdeleteIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M5 9H19V11H21V7H3V17H15V15H5V9Z" />
        <path d="M20.0001 17.4142L18.2072 19.2071L16.793 17.7929L18.5859 16L16.793 14.2071L18.2072 12.7929L20.0001 14.5858L21.793 12.7929L23.2072 14.2071L21.4143 16L23.2072 17.7929L21.793 19.2071L20.0001 17.4142Z" />
      </svg>
    </Icon>
  );
};
