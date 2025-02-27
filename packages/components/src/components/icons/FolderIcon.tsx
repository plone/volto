import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const FolderIcon = (props: IconPropsWithoutChildren) => {
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
          d="M9.41421 4H2V20H22V6H11.4142L9.41421 4ZM4 18V8H20V18H4Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
