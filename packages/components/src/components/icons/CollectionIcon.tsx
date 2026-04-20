import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const CollectionIcon = (props: IconPropsWithoutChildren) => {
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
          d="M17 3H7V5H17V3ZM5 7H12H19V9H15.4649H12H8.53513H5V7ZM5 11H3V21H21V11H19H16H14C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11H8H5ZM12 15C10.5194 15 9.22675 14.1956 8.53513 13H5V19H19V13H15.4649C14.7733 14.1956 13.4806 15 12 15Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
