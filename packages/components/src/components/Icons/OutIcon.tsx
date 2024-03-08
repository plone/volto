import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const OutIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M11 18C12.4021 18 13.6918 17.5191 14.7133 16.7133L16.1348 18.1348C14.7454 19.2991 12.9545 20 11 20C6.58172 20 3 16.4183 3 12C3 7.58172 6.58172 4 11 4C12.9545 4 14.7454 4.70094 16.1348 5.86515L14.7133 7.28675C13.6918 6.4809 12.4021 6 11 6C7.68629 6 5 8.68629 5 12C5 15.3137 7.68629 18 11 18Z" />
        <path d="M22.4141 12L17.707 16.7071L16.2927 15.2929L18.5857 13L10 13V11L18.5856 11L16.2927 8.70712L17.707 7.29291L22.4141 12Z" />
      </svg>
    </Icon>
  );
};
