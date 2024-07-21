import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ColumndeleteIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 5H15V15H17V3H7V21H11V19H9V5Z" />
        <path d="M16.0001 21.4142L14.2072 23.2071L12.793 21.7929L14.5859 20L12.793 18.2071L14.2072 16.7929L16.0001 18.5858L17.793 16.7929L19.2072 18.2071L17.4143 20L19.2072 21.7929L17.793 23.2071L16.0001 21.4142Z" />
      </svg>
    </Icon>
  );
};
