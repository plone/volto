import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useClient } from '@plone/volto/hooks';
import {
  Accordion,
  Button,
  Container,
  Divider,
  Header,
  Label,
  Message,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import {
  installAddon,
  listAddons,
  uninstallAddon,
  upgradeAddon,
} from '@plone/volto/actions';
import { Helmet } from '@plone/volto/helpers';
import { Icon, Toolbar, Toast } from '@plone/volto/components';
import circleBottomSVG from '@plone/volto/icons/circle-bottom.svg';
import circleTopSVG from '@plone/volto/icons/circle-top.svg';
import backSVG from '@plone/volto/icons/back.svg';
import { toast } from 'react-toastify';

const messages = defineMessages({
  activateAndDeactivate: {
    id: 'Activate and deactivate',
    defaultMessage: 'Activate and deactivate add-ons in the lists below.',
  },
  addAddons: {
    id: 'Add Addons',
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
  updatesAvailable: {
    id: 'Updates available',
    defaultMessage: 'Updates available',
  },
  updateInstalledAddons: {
    id: 'Update installed addons:',
    defaultMessage: 'Update installed addons:',
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
    id: 'Addon upgraded succesfuly',
    defaultMessage: 'Addon upgraded succesfuly',
  },
  addonNotUpgraded: {
    id: 'Addon could not be upgraded',
    defaultMessage: 'Addon could not be upgraded',
  },
  addonInstalled: {
    id: 'Addon installed succesfuly',
    defaultMessage: 'Addon installed succesfuly',
  },
  addonNotInstalled: {
    id: 'Addon could not be installed',
    defaultMessage: 'Addon could not be installed',
  },
  addonUninstalled: {
    id: 'Addon uninstalled succesfuly',
    defaultMessage: 'Addon uninstalled succesfuly',
  },
  addonNotUninstalled: {
    id: 'Addon could not be uninstalled',
    defaultMessage: 'Addon could not be uninstalled',
  },
});

const AddonsControlpanel = (props) => {
  const { title } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
  const [activeIndex, setactiveIndex] = useState(-1);
  const isClient = useClient();
  const installedAddons = useSelector(
    (state) => state.addons.installedAddons,
    shallowEqual,
  );
  const availableAddons = useSelector(
    (state) => state.addons.availableAddons,
    shallowEqual,
  );
  const upgradableAddons = useSelector(
    (state) => state.addons.upgradableAddons,
    shallowEqual,
  );
  const loadingAddons = useSelector((state) => state.addons.loading);

  useEffect(() => {
    dispatch(listAddons());
  }, [dispatch]);

  const onInstall = useCallback(
    (event, { value }) => {
      event.preventDefault();

      dispatch(installAddon(value))
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
        .finally(() => dispatch(listAddons()));
    },
    [dispatch, title, intl],
  );

  const onUninstall = useCallback(
    (event, { value }) => {
      event.preventDefault();
      dispatch(uninstallAddon(value))
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
        .finally(() => dispatch(listAddons()));
    },
    [dispatch, intl, title],
  );

  const onUpgrade = useCallback(
    (event, { value }) => {
      event.preventDefault();

      dispatch(upgradeAddon(value))
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
        .finally(() => dispatch(listAddons()));
    },
    [dispatch, intl],
  );

  const onAccordionClick = (event, item) => {
    const newIndex = activeIndex === item.index ? -1 : item.index;
    setactiveIndex(newIndex);
  };

  return (
    <Container id="page-addons" className="controlpanel-addons">
      <Helmet title={intl.formatMessage(messages.addOns)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Add-ons Settings"
            defaultMessage="Add-ons Settings"
          />
        </Segment>

        {loadingAddons ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <>
            {upgradableAddons.length > 0 && (
              <Message attached>
                <Message.Header>
                  <FormattedMessage
                    id="Updates available"
                    defaultMessage="Updates available"
                  />
                </Message.Header>
                <FormattedMessage
                  id="Update installed addons"
                  defaultMessage="Update installed addons"
                />
              </Message>
            )}
            <Segment>
              <Header as="h3">
                <FormattedMessage
                  id="Activate and deactivate"
                  defaultMessage="Activate and deactivate add-ons in the lists below."
                />
              </Header>
              <FormattedMessage
                id="Add Addons"
                defaultMessage="To make new add-ons show up here, add them to your configuration, build, and restart the server process. For detailed instructions see"
              />
              &nbsp;
              <a
                href="https://6.docs.plone.org/install/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(messages.installingAnAddon)}
              </a>
              .
            </Segment>
            <Segment key="header-available" secondary>
              <FormattedMessage id="Available" defaultMessage="Available" />:
              <Label circular>{availableAddons.length}</Label>
            </Segment>
            <Segment key="body-available" attached>
              <Accordion>
                <Divider />
                {availableAddons.map((item) => (
                  <div key={item.id}>
                    <Accordion.Title
                      active={activeIndex === item.id}
                      index={item.id}
                      onClick={onAccordionClick}
                    >
                      {item.title}
                      <Icon
                        name={
                          activeIndex === item.id
                            ? circleTopSVG
                            : circleBottomSVG
                        }
                        size="23px"
                        className={`accordionToggle ${item.title}`}
                      />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === item.id}>
                      <div className="description">{item.description}</div>
                      {item.uninstall_profile_id === '' && (
                        <div>
                          <Message icon="warning" warning>
                            <FormattedMessage
                              id="No uninstall profile"
                              defaultMessage="This addon does not provide an uninstall profile."
                            />
                          </Message>
                        </div>
                      )}
                      <Button.Group floated="right">
                        <Button
                          primary
                          onClick={onInstall}
                          value={item.id}
                          className="installAction"
                        >
                          <FormattedMessage
                            id="Install"
                            defaultMessage="Install"
                            className="button-label"
                          />
                        </Button>
                      </Button.Group>
                      <div className="version">
                        <FormattedMessage
                          id="Latest version"
                          defaultMessage="Latest version"
                        />
                        : &nbsp;
                        {item.version}
                      </div>
                    </Accordion.Content>
                    <Divider />
                  </div>
                ))}
              </Accordion>
            </Segment>
            <Segment key="header-installed" secondary>
              <FormattedMessage id="Installed" defaultMessage="Installed" />:
              <Label circular>{installedAddons.length}</Label>
            </Segment>
            <Segment key="body-installed" attached>
              <Accordion>
                <Divider />
                {installedAddons.map((item) => (
                  <div key={item.id}>
                    <Accordion.Title
                      active={activeIndex === item.id}
                      index={item.id}
                      onClick={onAccordionClick}
                      className={
                        item.upgrade_info.available ? 'updateAvailable' : ''
                      }
                    >
                      {item.title}

                      {item.upgrade_info.available && (
                        <Label>
                          <FormattedMessage
                            id="Update"
                            defaultMessage="Update"
                          />
                        </Label>
                      )}
                      <Icon
                        name={
                          activeIndex === item.id
                            ? circleTopSVG
                            : circleBottomSVG
                        }
                        size="24px"
                        className={`accordionToggle ${item.title}`}
                        color="#878f93"
                      />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === item.id}>
                      <div className="description">{item.description}</div>
                      <Button.Group floated="right">
                        {item.upgrade_info.available && (
                          <Button primary onClick={onUpgrade} value={item.id}>
                            <FormattedMessage
                              id="upgradeVersions"
                              defaultMessage="Update from version {origin} to {destination}"
                              values={{
                                origin: item.upgrade_info.installedVersion,
                                destination: item.upgrade_info.newVersion,
                              }}
                            />
                          </Button>
                        )}
                        {item.uninstall_profile_id && (
                          <Button
                            negative
                            onClick={onUninstall}
                            value={item.id}
                            className="uninstallAction"
                          >
                            <FormattedMessage
                              id="Uninstall"
                              defaultMessage="Uninstall"
                              className="button-label"
                            />
                          </Button>
                        )}
                      </Button.Group>
                      <div className="version">
                        <FormattedMessage
                          id="Installed version"
                          defaultMessage="Installed version"
                        />
                        : &nbsp; {item.version}
                      </div>
                    </Accordion.Content>
                    <Divider />
                  </div>
                ))}
              </Accordion>
            </Segment>
          </>
        )}
      </Segment.Group>

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
          document.getElementById('toolbar'),
        )}
    </Container>
  );
};

export default AddonsControlpanel;
