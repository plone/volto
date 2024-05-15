import React from 'react';

import { Action } from '../Action';

export function Remove(props) {
  return (
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
      <svg width="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M27,30 C27,30.552 26.551,31 26,31 L12,31 C11.449,31 11,30.552 11,30 L11,9 L27,9 L27,30 Z M19,5 C20.103,5 21,5.897 21,7 L17,7 C17,5.897 17.897,5 19,5 L19,5 Z M31,7 L23,7 C23,4.794 21.206,3 19,3 C16.794,3 15,4.794 15,7 L7,7 L7,9 L9,9 L9,30 C9,31.654 10.346,33 12,33 L26,33 C27.654,33 29,31.654 29,30 L29,9 L31,9 L31,7 Z"></path>
        <path d="M15 28 17 28 17 12 15 12zM21 28 23 28 23 12 21 12z"></path>
      </svg>
    </Action>
  );
}
