import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ArrowrightIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M13.2929 17.293L14.7071 18.7072L21.4142 12.0001L14.7071 5.29297L13.2929 6.70718L17.5858 11.0001H3V13.0001H17.5858L13.2929 17.293Z" />
      </svg>
    </Icon>
  );
};
