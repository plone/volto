import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const LeadingIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12.9258 9.2258L12 7L11.0742 9.2258L8.6713 9.41844L10.5021 10.9867L9.94275 13.3316L12 12.075L14.0572 13.3316L13.4979 10.9867L15.3287 9.41844L12.9258 9.2258Z" />
        <path
          fillRule="evenodd"
          d="M12 21L23 10L18 3L6 3L1 10L12 21ZM16.9708 5L20.3878 9.7838L12 18.1716L3.61223 9.7838L7.02924 5L16.9708 5Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
