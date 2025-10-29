import React from 'react';

export interface SidebarPortalProps {
  children?: React.ReactNode;
  selected: boolean;
  tab?: string;
}

declare function SidebarPortal({
  children,
  selected,
  tab,
}: SidebarPortalProps): React.ReactPortal | null;

export default SidebarPortal;
