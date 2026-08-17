import React from 'react';
import type { GetAddonResponse } from '@plone/types';
import { PressEvent } from 'react-aria-components';
interface BaseAddonProps {
    addon: GetAddonResponse;
    isFirst?: boolean;
}
interface UpgradableAddonProps extends BaseAddonProps {
    onUpgrade: (event: PressEvent) => void;
}
interface AvailableAddonProps extends BaseAddonProps {
    onInstall: (event: PressEvent) => void;
}
interface InstalledAddonProps extends BaseAddonProps {
    onUninstall: (event: PressEvent) => void;
}
declare const UpgradableItem: React.FC<UpgradableAddonProps>;
declare const AvailableItem: React.FC<AvailableAddonProps>;
declare const InstalledItem: React.FC<InstalledAddonProps>;
export { UpgradableItem, AvailableItem, InstalledItem };
export type { UpgradableAddonProps, InstalledAddonProps, AvailableAddonProps };
