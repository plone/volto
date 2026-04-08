import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const HomeIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="home-icon"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.5855 9.68946L12 2.7666L2.41455 9.68946L3.58553 11.3108L12 5.23367L20.4146 11.3108L21.5855 9.68946ZM7 12.0001H5V21.0001H11V16.0001H13V21.0001H19V12.0001H17V19.0001H15V14.0001H9V19.0001H7V12.0001Z"
        />
      </svg>
    </Icon>
  );
};
