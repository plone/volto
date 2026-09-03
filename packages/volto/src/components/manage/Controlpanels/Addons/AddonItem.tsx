import React from 'react';
import type { GetAddonResponse } from '@plone/types';
import { defineMessages, useIntl } from 'react-intl';
import {
  PressEvent,
  Button as RACButton,
  GridListItem,
} from 'react-aria-components';

const messages = defineMessages({
  addonUpgradableInfo: {
    id: 'This add-on was updated. Current profile installed version is {installedVersion}. New available profile version is {newVersion}.',
    defaultMessage:
      'This add-on was updated. Current profile installed version is {installedVersion}. New available profile version is {newVersion}.',
  },
  upgradeVersions: {
    id: 'upgradeVersions',
    defaultMessage: 'Update from version {origin} to {destination}',
  },
  pressEnterToInstall: {
    id: 'Press Enter to install this add-on',
    defaultMessage: 'Press Enter to install this add-on.',
  },
  pressEnterToUninstall: {
    id: 'Press Enter to uninstall this add-on',
    defaultMessage: 'Press Enter to uninstall this add-on.',
  },
  pressEnterToUpdate: {
    id: 'Press Enter to update this add-on',
    defaultMessage: 'Press Enter to update this add-on.',
  },
  useArrowsToNavigate: {
    id: 'Use the arrows to move between items',
    defaultMessage: 'Use the arrows to move between items.',
  },
});

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

const UpgradableItem: React.FC<UpgradableAddonProps> = ({
  addon,
  onUpgrade,
  isFirst,
}) => {
  const intl = useIntl();
  const descriptionText = intl.formatMessage(messages.addonUpgradableInfo, {
    installedVersion: addon.upgrade_info.installedVersion ?? '',
    newVersion: addon.upgrade_info.newVersion ?? '',
  });
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      textValue={
        (addon.upgrade_info.installedVersion && addon.upgrade_info.newVersion
          ? `${addon.description} ${descriptionText}`
          : addon.description) +
        (addon.upgrade_info.available
          ? `. ${intl.formatMessage(messages.pressEnterToUpdate)}`
          : '') +
        (isFirst ? ` ${intl.formatMessage(messages.useArrowsToNavigate)}` : '')
      }
      onAction={
        addon.upgrade_info.available
          ? () =>
              onUpgrade({
                target: { id: 'upgradable-' + addon.id },
              } as unknown as PressEvent)
          : undefined
      }
    >
      <div className="addon-item-header">
        <h4>{addon.title + ` - ${addon.version}`}</h4>
        {addon.upgrade_info.available ? (
          <RACButton
            id={'upgradable-' + addon.id}
            onPress={onUpgrade}
            aria-label={
              intl.formatMessage({ id: 'Update' }) +
              ' ' +
              addon.title +
              ' ' +
              intl.formatMessage(messages.upgradeVersions, {
                origin: addon.upgrade_info.installedVersion ?? '',
                destination: addon.upgrade_info.newVersion ?? '',
              })
            }
            className={'install-action'}
          >
            {intl.formatMessage({ id: 'Update' }) + ' ' + addon.title}
          </RACButton>
        ) : null}
      </div>
      <div className="addonUpgradableInfo" id={`addon-desc-${addon.id}`}>
        <p>{addon.description}</p>
        {addon.upgrade_info.installedVersion &&
        addon.upgrade_info.newVersion ? (
          <p>{descriptionText}</p>
        ) : null}
      </div>
    </GridListItem>
  );
};

const AvailableItem: React.FC<AvailableAddonProps> = ({
  addon,
  onInstall,
  isFirst,
}) => {
  const intl = useIntl();
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      textValue={`${addon.title} - ${addon.description}. ${intl.formatMessage(messages.pressEnterToInstall)}${isFirst ? ` ${intl.formatMessage(messages.useArrowsToNavigate)}` : ''}`}
      onAction={() =>
        onInstall({ target: { id: addon.id } } as unknown as PressEvent)
      }
    >
      <div className="addon-item-header">
        <h4>{addon.title + ` - ${addon.version}`}</h4>
        <RACButton
          id={addon.id}
          onPress={onInstall}
          aria-label={intl.formatMessage({ id: 'Install' }) + ' ' + addon.title}
          className={'install-action'}
        >
          {intl.formatMessage({ id: 'Install' })}
        </RACButton>
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
  isFirst,
}) => {
  const intl = useIntl();
  return (
    <GridListItem
      key={addon['@id']}
      className="addon-item"
      textValue={`${addon.title} ${addon.description}. ${intl.formatMessage(messages.pressEnterToUninstall)}${isFirst ? ` ${intl.formatMessage(messages.useArrowsToNavigate)}` : ''}`}
      onAction={() =>
        onUninstall({
          target: { id: 'installed-' + addon.id },
        } as unknown as PressEvent)
      }
    >
      <div className="addon-item-header">
        <h4>{addon.title + ` - ${addon.version}`}</h4>
        <RACButton
          id={'installed-' + addon.id}
          onPress={onUninstall}
          aria-label={
            intl.formatMessage({ id: 'Uninstall' }) + ' ' + addon.title
          }
          className={'uninstall-action'}
        >
          {intl.formatMessage({ id: 'Uninstall' })}
        </RACButton>
      </div>
      <div className="addonInfo" id={`addon-desc-${addon.id}`}>
        <p>{addon.description}</p>
      </div>
    </GridListItem>
  );
};

export { UpgradableItem, AvailableItem, InstalledItem };
export type { UpgradableAddonProps, InstalledAddonProps, AvailableAddonProps };
