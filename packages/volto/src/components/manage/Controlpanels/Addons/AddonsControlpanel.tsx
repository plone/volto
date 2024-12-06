import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useClient } from '@plone/volto/hooks';
import { Dimmer, Loader } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import {
  installAddon,
  listAddons,
  uninstallAddon,
  upgradeAddon,
} from '@plone/volto/actions';
import { Helmet } from '@plone/volto/helpers';
import { Icon, Toolbar, Toast } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';
import { toast } from 'react-toastify';
import type { GetAddonResponse } from '@plone/types';
import { AnyAction } from 'redux';
import type { PressEvent } from 'react-aria-components';
import { AddonPanel } from './AddonPanel';

import './index.css';

const messages = defineMessages({
  activateAndDeactivate: {
    id: 'Activate and deactivate',
    defaultMessage: 'Activate and deactivate add-ons in the lists below.',
  },
  addAddons: {
    id: 'Add Add-ons',
    defaultMessage:
      'To make new add-ons show up here, add them to your configuration, build, and restart the server process. For detailed instructions see',
  },
  addonsSettings: {
    id: 'Add-ons Settings',
    defaultMessage: 'Add-ons Settings',
  },
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
  install: {
    id: 'Install',
    defaultMessage: 'Install',
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
    defaultMessage: 'This add-on does not provide an uninstall profile.',
  },
  update: {
    id: 'Update',
    defaultMessage: 'Update',
  },
  updatesAvailable: {
    id: 'Updates available',
    defaultMessage: 'Updates available',
  },
  noUpgradesAvailable: {
    id: 'No Upgrades available',
    defaultMessage:
      'No upgrades in this corner. You are up to date. High fives.',
  },
  noAddonAvailable: {
    id: 'No Addon available',
    defaultMessage: 'No add-ons available for installation.',
  },
  noInstalledAvailable: {
    id: 'No Installed available',
    defaultMessage: 'No installed add-ons.',
  },
  updateInstalledAddons: {
    id: 'Update installed add-ons:',
    defaultMessage: 'Update installed add-ons:',
  },
  uninstall: {
    id: 'Uninstall',
    defaultMessage: 'Uninstall',
  },
  addOns: {
    id: 'Add-ons',
    defaultMessage: 'Add-ons',
  },
  installingAnAddon: {
    id: 'Installing a third party add-on',
    defaultMessage: 'Installing a third party add-on',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  addonUpgraded: {
    id: 'Add-on upgraded succesfuly',
    defaultMessage: 'Add-on upgraded succesfuly',
  },
  addonNotUpgraded: {
    id: 'Add-on could not be upgraded',
    defaultMessage: 'Add-on could not be upgraded',
  },
  addonInstalled: {
    id: 'Add-on installed succesfuly',
    defaultMessage: 'Add-on installed successfully',
  },
  addonNotInstalled: {
    id: 'Add-on could not be installed',
    defaultMessage: 'Add-on could not be installed',
  },
  addonUninstalled: {
    id: 'Add-on uninstalled succesfuly',
    defaultMessage: 'Add-on uninstalled successfully',
  },
  addonNotUninstalled: {
    id: 'Add-on could not be uninstalled',
    defaultMessage: 'Add-on could not be uninstalled',
  },
  upgradableAddons: {
    id: 'Upgradable add-ons',
    defaultMessage: 'Upgradable add-ons',
  },
  availableAddons: {
    id: 'Available add-ons',
    defaultMessage: 'Available add-ons',
  },
  installedAddons: {
    id: 'Installed add-ons',
    defaultMessage: 'Installed add-ons',
  },
});

interface Props extends RouteComponentProps {
  title: string;
}

const AddonsControlpanel = (props: Props) => {
  const { title } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
  const isClient = useClient();
  const installedAddons = useSelector<Record<string, any>>(
    (state) => (state.addons.installedAddons ?? []) as GetAddonResponse[],
    shallowEqual,
  );
  const availableAddons = useSelector<Record<string, any>>(
    (state) => state.addons.availableAddons ?? ([] as GetAddonResponse[]),
    shallowEqual,
  );
  const upgradableAddons = useSelector<Record<string, any>>(
    (state) => (state.addons.upgradableAddons ?? []) as GetAddonResponse[],
    shallowEqual,
  );

  const loadingAddons = useSelector<Record<string, any>>(
    (state) => state.addons.loading,
  );

  useEffect(() => {
    dispatch(listAddons() as AnyAction);
  }, [dispatch]);

  const onInstall = useCallback(
    (event: PressEvent) => {
      const value = event.target.id;

      dispatch(installAddon(value) as AnyAction)
        .then(() => {
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.addonInstalled, {
                title: title,
              })}
            />,
          );
        })
        .catch(() => {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.error)}
              content={intl.formatMessage(messages.addonNotInstalled)}
            />,
          );
        })
        .finally(() => dispatch(listAddons() as AnyAction));
    },
    [dispatch, title, intl],
  );

  const onUninstall = useCallback(
    (event: PressEvent) => {
      const value = event.target.id.replace('installed-', '');
      dispatch(uninstallAddon(value) as AnyAction)
        .then(() => {
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.addonUninstalled)}
            />,
          );
        })
        .catch(() => {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.error)}
              content={intl.formatMessage(messages.addonNotUninstalled, {
                title: title,
              })}
            />,
          );
        })
        .finally(() => dispatch(listAddons() as AnyAction));
    },
    [dispatch, intl, title],
  );

  const onUpgrade = useCallback(
    (event: PressEvent) => {
      const value = event.target.id.replace('upgradable-', '');
      dispatch(upgradeAddon(value) as AnyAction)
        .then(() => {
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.addonUpgraded)}
            />,
          );
        })
        .catch(() => {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.error)}
              content={intl.formatMessage(messages.addonNotUpgraded)}
            />,
          );
        })
        .finally(() => dispatch(listAddons() as AnyAction));
    },
    [dispatch, intl],
  );

  return (
    <div id="page-addons" className="ui container controlpanel-addons">
      <Helmet title={intl.formatMessage(messages.addOns)} />
      <div className="main-section">
        <h1>
          <FormattedMessage
            id="Add-ons Settings"
            defaultMessage="Add-ons Settings"
          />
        </h1>

        {loadingAddons ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <>
            <div>
              <h2>
                <FormattedMessage
                  id="Activate and deactivate"
                  defaultMessage="Activate and deactivate add-ons in the lists below."
                />
              </h2>
              <FormattedMessage
                id="Add Add-ons"
                defaultMessage="To make new add-ons show up here, add them to your configuration, build, and restart the server process. For detailed instructions see"
              />
              &nbsp;
              <a
                href="https://6.docs.plone.org/volto/development/add-ons/install-an-add-on.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(messages.installingAnAddon)}
              </a>
              .
            </div>
            <AddonPanel
              type="upgradable"
              containerId="header-upgradable"
              addons={upgradableAddons as GetAddonResponse[]}
              onUpgrade={onUpgrade}
              aria-label={intl.formatMessage(messages.upgradableAddons)}
            />
            <AddonPanel
              type="available"
              containerId="header-available"
              addons={availableAddons as GetAddonResponse[]}
              onInstall={onInstall}
              aria-label={intl.formatMessage(messages.availableAddons)}
            />
            <AddonPanel
              type="installed"
              containerId="header-installed"
              addons={installedAddons as GetAddonResponse[]}
              onUninstall={onUninstall}
              aria-label={intl.formatMessage(messages.installedAddons)}
            />
          </>
        )}
      </div>

      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    aria-label={intl.formatMessage(messages.back)}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />,
          // @ts-ignore
          document.getElementById('toolbar'),
        )}
    </div>
  );
};

export default AddonsControlpanel;
