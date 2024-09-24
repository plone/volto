import React from 'react';
import { Icon } from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

export const UploadIcon = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12.0001 2.58594L16.7072 7.29305L15.293 8.70726L13 6.41429L13 15.0001H11L11 6.41444L8.70718 8.70726L7.29297 7.29304L12.0001 2.58594Z" />
        <path d="M17.917 13.0001H19.9381C19.979 13.3277 20 13.6615 20 14.0001C20 18.4184 16.4183 22.0001 12 22.0001C7.58172 22.0001 4 18.4184 4 14.0001C4 13.6615 4.02104 13.3277 4.06189 13.0001H6.08296C6.0284 13.3253 6 13.6594 6 14.0001C6 17.3138 8.68629 20.0001 12 20.0001C15.3137 20.0001 18 17.3138 18 14.0001C18 13.6594 17.9716 13.3253 17.917 13.0001Z" />
      </svg>
    </Icon>
  );
};
