import React, { AriaAttributes } from 'react';
import {
  AvailableAddonProps,
  AvailableItem,
  InstalledAddonProps,
  InstalledItem,
  UpgradableItem,
  type UpgradableAddonProps,
} from './AddonItem';
import type { GetAddonResponse } from '@plone/types';
import { IntlShape, useIntl } from 'react-intl';
import { GridList, GridListItem } from 'react-aria-components';

interface BasePanelProps extends AriaAttributes {
  addons: GetAddonResponse[];
  containerId: string;
  containerClassname?: string;
}

interface AvailablePanelProps
  extends BasePanelProps,
    Omit<AvailableAddonProps, 'addon'> {
  type: 'available';
}
interface InstalledPanelProps
  extends BasePanelProps,
    Omit<InstalledAddonProps, 'addon'> {
  type: 'installed';
}
interface UpgradablePanelProps
  extends BasePanelProps,
    Omit<UpgradableAddonProps, 'addon'> {
  type: 'upgradable';
}

type PanelProps =
  | AvailablePanelProps
  | InstalledPanelProps
  | UpgradablePanelProps;

const UpgradesPanel: React.FC<UpgradablePanelProps & { intl: IntlShape }> = (
  props,
) => {
  const { addons, type, containerId, containerClassname, intl, ...rest } =
    props;
  return (
    <div
      key={containerId}
      id={containerId}
      role="group"
      aria-label={rest['aria-label']}
      className={`addons-section ${containerClassname ?? ''}`}
    >
      <div className="addons-section-header">
        <h3 id={type}>
          {intl.formatMessage({ id: 'Updates available' })}:{' '}
          <span>{addons.length}</span>
        </h3>
      </div>
      <div>
        <GridList
          aria-labelledby={type}
          selectionBehavior="replace"
          disabledBehavior="selection"
          selectionMode="single"
        >
          {addons.length ? (
            addons.map((ua: GetAddonResponse) => (
              <UpgradableItem key={ua['@id']} {...rest} addon={ua} />
            ))
          ) : (
            <GridListItem
              key="no-upgrades-available"
              className="no-upgrades-available"
            >
              {intl.formatMessage({ id: 'No Upgrades available' })}
            </GridListItem>
          )}
        </GridList>
      </div>
    </div>
  );
};
const AvailablePanel: React.FC<AvailablePanelProps & { intl: IntlShape }> = (
  props,
) => {
  const { addons, type, containerId, containerClassname, intl, ...rest } =
    props;
  return (
    <div
      key={containerId}
      id={containerId}
      role="group"
      aria-label={rest['aria-label']}
      className={`addons-section ${containerClassname ?? ''}`}
    >
      <div className="addons-section-header">
        <h3 id={type}>
          {intl.formatMessage({ id: 'Available addons' })}:{' '}
          <span>{addons.length}</span>
        </h3>
      </div>
      <div>
        <GridList
          aria-labelledby={type}
          selectionBehavior="replace"
          disabledBehavior="selection"
          selectionMode="single"
        >
          {addons.length ? (
            addons.map((ua: GetAddonResponse) => (
              <AvailableItem key={ua['@id']} {...rest} addon={ua} />
            ))
          ) : (
            <GridListItem
              key="no-addon-available"
              className="no-addon-available"
            >
              {intl.formatMessage({ id: 'No Addon available' })}
            </GridListItem>
          )}
        </GridList>
      </div>
    </div>
  );
};
const InstalledPanel: React.FC<InstalledPanelProps & { intl: IntlShape }> = (
  props,
) => {
  const { addons, type, containerId, containerClassname, intl, ...rest } =
    props;
  return (
    <div
      key={containerId}
      id={containerId}
      role="group"
      aria-label={rest['aria-label']}
      className={`addons-section ${containerClassname ?? ''}`}
    >
      <div className="addons-section-header">
        <h3 id={type}>
          {intl.formatMessage({ id: 'Installed addons' })}:{' '}
          <span>{addons.length}</span>
        </h3>
      </div>
      <div>
        <GridList
          aria-labelledby={type}
          selectionBehavior="replace"
          disabledBehavior="selection"
          selectionMode="single"
        >
          {addons.length ? (
            addons.map((ua: GetAddonResponse) => (
              <InstalledItem key={ua['@id']} {...rest} addon={ua} />
            ))
          ) : (
            <GridListItem
              key="no-installed-available"
              className="no-installed-available"
            >
              {intl.formatMessage({ id: 'No Installed available' })}
            </GridListItem>
          )}
        </GridList>
      </div>
    </div>
  );
};

const AddonPanel: React.FC<PanelProps> = (props) => {
  const intl = useIntl();
  if (props.type === 'upgradable') {
    return <UpgradesPanel {...props} intl={intl} />;
  } else if (props.type === 'available') {
    return <AvailablePanel {...props} intl={intl} />;
  } else if (props.type === 'installed') {
    return <InstalledPanel {...props} intl={intl} />;
  }
  return null;
};

export { AddonPanel };
export type { AvailablePanelProps, InstalledPanelProps, UpgradablePanelProps };
