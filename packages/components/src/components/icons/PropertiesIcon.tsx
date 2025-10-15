import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const PropertiesIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M4.66674 8.74762 8.70718 4.70718 7.29297 3.29297 4.66674 5.9192 3.70718 4.95964 2.29297 6.37385 4.66674 8.74762ZM22 5.00006H10V7.00006H22V5.00006ZM22 11.0001H10V13.0001H22V11.0001ZM10 17.0001H22V19.0001H10V17.0001ZM8.70718 10.7072 4.66674 14.7476 2.29297 12.3738 3.70718 10.9596 4.66674 11.9192 7.29297 9.29297 8.70718 10.7072ZM4.66674 20.7476 8.70718 16.7072 7.29297 15.293 4.66674 17.9192 3.70718 16.9596 2.29297 18.3738 4.66674 20.7476Z" />
      </svg>
    </Icon>
  );
};
