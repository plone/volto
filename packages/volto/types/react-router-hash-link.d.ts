declare module 'react-router-hash-link' {
  import { ComponentType } from 'react';
  import { NavLinkProps } from 'react-router-dom';

  interface HashLinkProps extends NavLinkProps {
    smooth?: boolean;
    scroll?: (element: HTMLElement) => void;
  }

  export const HashLink: ComponentType<HashLinkProps>;
  export const NavHashLink: ComponentType<HashLinkProps>;
}
