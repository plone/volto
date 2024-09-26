import React from 'react';
import type { GetAddonResponse } from './types.d.ts';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import {
  PressEvent,
  Button as RACButton,
  GridListItem,
} from 'react-aria-components';
import {
  AvailablePanelProps,
  InstalledPanelProps,
  UpgradablePanelProps,
} from './AddonPanel.js';

const messages = defineMessages({
  available: {
    id: 'Available',
    defaultMessage: 'Available',
  },
  availableVersion: {
    id: 'Latest version',
    defaultMessage: 'Latest version',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  installed: {
    id: 'Installed',
    defaultMessage: 'Installed',
  },
  installedVersion: {
    id: 'Installed version',
    defaultMessage: 'Installed version',
  },
  noUninstallProfile: {
    id: 'No uninstall profile',
    defaultMessage: 'This addon does not provide an uninstall profile.',
  },
  update: {
    id: 'Update',
    defaultMessage: 'Update',
  },
  uninstall: {
    id: 'Uninstall',
    defaultMessage: 'Uninstall',
  },
  addonUpgradableInfo: {
    id: 'This addon was updated. Current profile installed version is {installedVersion}. New available profile version is {newVersion}',
    defaultMessage:
      'This addon was updated. Current profile installed version is {installedVersion}. New available profile version is {newVersion}',
  },
});

interface BaseAddonProps {
  addon: GetAddonResponse;
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

type AddonItemProps =
  | UpgradableAddonProps
  | AvailableAddonProps
  | InstalledAddonProps;

const UpgradableItem: React.FC<UpgradableAddonProps> = ({
  addon,
  onUpgrade,
}) => {
  const intl = useIntl();
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      aria-describedby={`addon-desc-${addon.id}`}
    >
      <div className="addon-item-header">
        <h4>{addon.title}</h4>
        {addon.upgrade_info.available ? (
          <div>
            <RACButton
              id={addon.id}
              onPress={onUpgrade}
              aria-label={
                intl.formatMessage(messages.update) +
                ' ' +
                addon.title +
                ' ' +
                intl.formatMessage({ id: 'upgradeVersions' })
              }
              className={'btn-primary'}
            >
              {intl.formatMessage({ id: 'Update' }) + ' ' + addon.title}
            </RACButton>
          </div>
        ) : null}
      </div>
      <div className="addonUpgradableInfo" id={`addon-desc-${addon.id}`}>
        <p>{addon.description}</p>
        {addon.upgrade_info.installedVersion &&
        addon.upgrade_info.newVersion ? (
          <p>
            {intl.formatMessage(messages.addonUpgradableInfo, {
              installedVersion: addon.upgrade_info.installedVersion ?? '',
              newVersion: addon.upgrade_info.newVersion ?? '',
            })}
          </p>
        ) : null}
      </div>
    </GridListItem>
  );
};

const AvailableItem: React.FC<AvailableAddonProps> = ({ addon, onInstall }) => {
  const intl = useIntl();
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      aria-describedby={`addon-desc-${addon.id}`}
    >
      <div className="addon-item-header">
        <h4>{addon.title}</h4>
        <div>
          <RACButton
            id={addon.id}
            onPress={onInstall}
            aria-label={
              intl.formatMessage({ id: 'Install' }) + ' ' + addon.title
            }
            className={'btn-primary'}
          >
            {intl.formatMessage({ id: 'Install' }) + ' ' + addon.title}
          </RACButton>
        </div>
      </div>
      <div className="addonInfo" id={`addon-desc-${addon.id}`}>
        <p>{addon.description}</p>
      </div>
    </GridListItem>
  );
};
const InstalledItem: React.FC<InstalledAddonProps> = ({
  addon,
  onUninstall,
}) => {
  const intl = useIntl();
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      aria-describedby={`addon-desc-${addon.id}`}
    >
      <div className="addon-item-header">
        <h4>{addon.title}</h4>
        <div>
          <RACButton
            id={addon.id}
            onPress={onUninstall}
            aria-label={
              intl.formatMessage({ id: 'Uninstall' }) + ' ' + addon.title
            }
            className={'btn-danger'}
          >
            {intl.formatMessage({ id: 'Uninstall' }) + ' ' + addon.title}
          </RACButton>
        </div>
      </div>
      <div className="addonInfo" id={`addon-desc-${addon.id}`}>
        <p>{addon.description}</p>
      </div>
    </GridListItem>
  );
};

export { UpgradableItem, AvailableItem, InstalledItem };
export type { UpgradableAddonProps, InstalledAddonProps, AvailableAddonProps };
