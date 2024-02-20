import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const LanguageIcon = (props: IconPropsWithoutChildren) => {
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
          d="M13 3H11V6H4V8H6.14603C6.72201 10.8754 8.4029 13.2122 10.3922 15.0269C8.05005 16.8465 5.43103 18.0192 3.70898 18.5433L4.29131 20.4566C6.30162 19.8448 9.32436 18.4761 11.9749 16.3239C14.5162 18.201 17.3216 19.4054 19.2194 19.9599L19.7803 18.0401C18.1527 17.5646 15.7289 16.535 13.4937 14.954C15.3226 13.1144 16.8284 10.8003 17.3604 8H20V6H13V3ZM8.19558 8H15.3165C14.8002 10.2269 13.5262 12.1292 11.9131 13.7052C10.155 12.1472 8.7535 10.2439 8.19558 8Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};
