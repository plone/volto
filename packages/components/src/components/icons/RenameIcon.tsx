import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const RenameIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 3H21V5H19V19H21V21H15V19H17V5H15V3Z" />
        <path
          fillRule="evenodd"
          d="M13.9362 17H11.7122L10.8482 14.92H5.60021L4.73621 17H2.51221L7.12021 6.008H9.32821L13.9362 17ZM8.22421 8.648L6.28821 13.288H10.1602L8.22421 8.648Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
