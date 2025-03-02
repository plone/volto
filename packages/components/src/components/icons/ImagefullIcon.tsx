import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ImagefullIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9.70726 7.70712L8.29304 6.29291L4.58594 10L8.29304 13.7071L9.70726 12.2929L8.41435 11H15.5856L14.2927 12.2929L15.707 13.7071L19.4141 9.99999L15.707 6.29288L14.2927 7.70709L15.5857 9H8.41438L9.70726 7.70712Z" />
        <path
          fillRule="evenodd"
          d="M2 3V17H22V3H2ZM20 5H4V15H20V5Z"
          clipRule="evenodd"
        />
        <path d="M4 19H20V21H4V19Z" />
      </svg>
    </Icon>
  );
};
