import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const PencilIcon = (props: IconPropsWithoutChildren) => {
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
          d="M19.0927 3.32161C18.3117 2.54056 17.0453 2.54056 16.2643 3.32161L4.2357 15.3502L3.5 20.5001L8.64992 19.7644L20.6785 7.73583C21.4596 6.95478 21.4596 5.68845 20.6785 4.9074L19.0927 3.32161ZM5.85702 18.1431L6.12132 16.293L14.6786 7.73571L16.2644 9.3215L7.70711 17.8788L5.85702 18.1431ZM17.6786 7.90728L19.2643 6.32161L17.6785 4.73582L16.0928 6.3215L17.6786 7.90728Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
