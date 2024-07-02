import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const CodeIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M6.29304 7.29297 7.70726 8.70718 4.41436 12.0001 7.70726 15.293 6.29304 16.7072 1.58594 12.0001 6.29304 7.29297ZM14.8943 8.44728 10.8943 16.4473 9.10547 15.5529 13.1055 7.55286 14.8943 8.44728ZM16.2927 15.2931 17.707 16.7073 22.4141 12.0002 17.707 7.29306 16.2927 8.70728 19.5856 12.0002 16.2927 15.2931Z" />
      </svg>
    </Icon>
  );
};
