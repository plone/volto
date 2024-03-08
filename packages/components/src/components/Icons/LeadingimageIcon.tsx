import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const LeadingimageIcon = (props: IconPropsWithoutChildren) => {
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
          d="M12 21L1 10L6 3L18 3L23 10L12 21ZM20.3878 9.7838L16.9708 5L7.02924 5L3.61223 9.7838L5.64752 11.8191L8.95092 8.45923L12.4176 12.0173L14.9116 9.49744C14.1243 9.45168 13.5 8.79875 13.5 8C13.5 7.17157 14.1716 6.5 15 6.5C15.8284 6.5 16.5 7.17157 16.5 8C16.5 8.82843 15.8284 9.5 15 9.5C14.9927 9.5 14.9853 9.49995 14.978 9.49984L17.8007 12.3708L20.3878 9.7838ZM12 18.1716L7.06179 13.2334L8.94444 11.3185L12.4063 14.8717L14.939 12.3129L16.3865 13.7851L12 18.1716Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
