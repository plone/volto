import React from 'react';
import { createPortal } from 'react-dom';

type SidebarPortalProps = {
  children?: React.ReactNode;
  selected: boolean;
  tab?: string;
};

const SidebarPortal = ({
  children,
  selected,
  tab = 'sidebar-properties',
}: SidebarPortalProps) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => setIsClient(true), []);

  if (!isClient || !selected) {
    return null;
  }

  const target = document.getElementById(tab);

  if (!target) {
    return null;
  }

  return createPortal(
    <div role="form" style={{ height: '100%' }}>
      <div
        style={{ height: '100%' }}
        role="presentation"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    target,
  );
};

export default SidebarPortal;
