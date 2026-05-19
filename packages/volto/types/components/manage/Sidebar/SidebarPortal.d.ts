import React from 'react';
type SidebarPortalProps = {
    children?: React.ReactNode;
    selected: boolean;
    tab?: string;
};
declare const SidebarPortal: ({ children, selected, tab, }: SidebarPortalProps) => React.ReactPortal;
export default SidebarPortal;
