import React from 'react';
type PortalStyle = React.CSSProperties & {
    left: number;
    top: number;
};
type SelectMenuProps = {
    closeMenuOnScroll?: boolean | ((event: Event) => boolean);
    styles?: {
        menuPortal?: (base: PortalStyle, state: unknown) => React.CSSProperties;
        [key: string]: unknown;
    };
};
export default function withSelectMenuPortal<Props extends SelectMenuProps, Instance>(Select: React.ComponentType<Props & React.RefAttributes<Instance>>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<Instance>>;
export {};
