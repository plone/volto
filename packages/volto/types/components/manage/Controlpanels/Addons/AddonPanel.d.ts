import React, { AriaAttributes } from 'react';
import { AvailableAddonProps, InstalledAddonProps, type UpgradableAddonProps } from './AddonItem';
import type { GetAddonResponse } from '@plone/types';
interface BasePanelProps extends AriaAttributes {
    addons: GetAddonResponse[];
    containerId: string;
    containerClassname?: string;
}
interface AvailablePanelProps extends BasePanelProps, Omit<AvailableAddonProps, 'addon'> {
    type: 'available';
}
interface InstalledPanelProps extends BasePanelProps, Omit<InstalledAddonProps, 'addon'> {
    type: 'installed';
}
interface UpgradablePanelProps extends BasePanelProps, Omit<UpgradableAddonProps, 'addon'> {
    type: 'upgradable';
}
type PanelProps = AvailablePanelProps | InstalledPanelProps | UpgradablePanelProps;
declare const AddonPanel: React.FC<PanelProps>;
export { AddonPanel };
export type { AvailablePanelProps, InstalledPanelProps, UpgradablePanelProps };
