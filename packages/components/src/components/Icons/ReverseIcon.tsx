import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const ReverseIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10.1885 5.23831C8.52721 5.68346 7.16654 6.68944 6.25535 7.99985H8V9.99985H3V4.99985H5V6.34247C6.15482 4.91139 7.75799 3.81902 9.67087 3.30646 14.4721 2.01998 19.4071 4.86923 20.6936 9.67042L18.7617 10.1881C17.7611 6.4538 13.9228 4.23772 10.1885 5.23831ZM5.23876 13.8115C6.23935 17.5458 10.0777 19.7619 13.812 18.7613 15.4731 18.3162 16.8339 17.3102 17.7451 15.9998H16V13.9998H21V18.9998H19V17.6577C17.8452 19.0885 16.2423 20.1806 14.3296 20.6931 9.52842 21.9796 4.59339 19.1304 3.30691 14.3292L5.23876 13.8115Z" />
      </svg>
    </Icon>
  );
};
