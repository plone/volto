/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/AddonsControlpanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
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
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

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

/**
 * AddonsControlpanel class.
 * @class AddonsControlpanel
 * @extends Component
 */
class AddonsControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    listAddons: PropTypes.func.isRequired,
    installAddon: PropTypes.func.isRequired,
    uninstallAddon: PropTypes.func.isRequired,
    installedAddons: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        version: PropTypes.string,
        description: PropTypes.string,
        uninstall_profile_id: PropTypes.string,
        upgrade_info: PropTypes.shape({
          available: PropTypes.boolean,
        }),
      }),
    ).isRequired,
    availableAddons: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        version: PropTypes.string,
        description: PropTypes.string,
        uninstall_profile_id: PropTypes.string,
        upgrade_info: PropTypes.shape({
          available: PropTypes.boolean,
        }),
      }),
    ).isRequired,
    upgradableAddons: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        version: PropTypes.string,
        description: PropTypes.string,
        uninstall_profile_id: PropTypes.string,
        upgrade_info: PropTypes.shape({
          available: PropTypes.boolean,
        }),
      }),
    ).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onAccordionClick = this.onAccordionClick.bind(this);
    this.onInstall = this.onInstall.bind(this);
    this.onUninstall = this.onUninstall.bind(this);
    this.onUpgrade = this.onUpgrade.bind(this);
    this.state = {
      activeIndex: -1,
      installedAddons: [],
      availableAddons: [],
      upgradableAddons: [],
      isClient: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.listAddons();
    this.setState({ isClient: true });
  }

  /**
   * Install handler
   * @method onInstall
   * @param {Object} event Event object.
   * @param {string} value Id of package to install.
   * @returns {undefined}
   */
  onInstall(event, { value }) {
    event.preventDefault();
    this.props
      .installAddon(value)
      .then(() => {
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.addonInstalled, {
              title: this.props.title,
            })}
          />,
        );
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.error)}
            content={this.props.intl.formatMessage(messages.addonNotInstalled)}
          />,
        );
      })
      .finally(() => this.props.listAddons());
  }

  /**
   * Uninstall handler
   * @method onUninstall
   * @param {Object} event Event object.
   * @param {string} value Id of package to uninstall.
   * @returns {undefined}
   */
  onUninstall(event, { value }) {
    event.preventDefault();
    this.props
      .uninstallAddon(value)
      .then(() => {
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.addonUninstalled)}
          />,
        );
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.error)}
            content={this.props.intl.formatMessage(
              messages.addonNotUninstalled,
              {
                title: this.props.title,
              },
            )}
          />,
        );
      })
      .finally(() => this.props.listAddons());
  }

  /**
   * Unpgrade handler
   * @method onUpgrade
   * @param {Object} event Event object.
   * @param {string} value Id of package to update.
   * @returns {undefined}
   */
  onUpgrade(event, { value }) {
    event.preventDefault();
    this.props
      .upgradeAddon(value)
      .then(() => {
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.addonUpgraded)}
          />,
        );
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.error)}
            content={this.props.intl.formatMessage(messages.addonNotUpgraded)}
          />,
        );
      })
      .finally(() => this.props.listAddons());
  }

  /**
   * On accordion click handler
   * @method onAccordionClick
   * @param {object} event Event object.
   * @param {object} index Index of the accordion element being clicked
   * @returns {undefined}
   */
  onAccordionClick(event, item) {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === item.index ? -1 : item.index;
    this.setState({ activeIndex: newIndex });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-addons" className="controlpanel-addons">
        <Helmet title={this.props.intl.formatMessage(messages.addOns)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Add-ons Settings"
              defaultMessage="Add-ons Settings"
            />
          </Segment>

          {this.props.loadingAddons ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : (
            <>
              {this.props.upgradableAddons.length > 0 && (
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
                  {this.props.intl.formatMessage(messages.installingAnAddon)}
                </a>
                .
              </Segment>
              <Segment key="header-available" secondary>
                <FormattedMessage id="Available" defaultMessage="Available" />:
                <Label circular>{this.props.availableAddons.length}</Label>
              </Segment>
              <Segment key="body-available" attached>
                <Accordion>
                  <Divider />
                  {this.props.availableAddons.map((item) => (
                    <div key={item.id}>
                      <Accordion.Title
                        active={this.state.activeIndex === item.id}
                        index={item.id}
                        onClick={this.onAccordionClick}
                      >
                        {item.title}
                        <Icon
                          name={
                            this.state.activeIndex === item.id
                              ? circleTopSVG
                              : circleBottomSVG
                          }
                          size="23px"
                          className={`accordionToggle ${item.title}`}
                        />
                      </Accordion.Title>
                      <Accordion.Content
                        active={this.state.activeIndex === item.id}
                      >
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
                            onClick={this.onInstall}
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
                <Label circular>{this.props.installedAddons.length}</Label>
              </Segment>
              <Segment key="body-installed" attached>
                <Accordion>
                  <Divider />
                  {this.props.installedAddons.map((item) => (
                    <div key={item.id}>
                      <Accordion.Title
                        active={this.state.activeIndex === item.id}
                        index={item.id}
                        onClick={this.onAccordionClick}
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
                            this.state.activeIndex === item.id
                              ? circleTopSVG
                              : circleBottomSVG
                          }
                          size="24px"
                          className={`accordionToggle ${item.title}`}
                          color="#878f93"
                        />
                      </Accordion.Title>
                      <Accordion.Content
                        active={this.state.activeIndex === item.id}
                      >
                        <div className="description">{item.description}</div>
                        <Button.Group floated="right">
                          {item.upgrade_info.available && (
                            <Button
                              primary
                              onClick={this.onUpgrade}
                              value={item.id}
                            >
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
                              onClick={this.onUninstall}
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

        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Link to="/controlpanel" className="item">
                    <Icon
                      name={backSVG}
                      aria-label={this.props.intl.formatMessage(messages.back)}
                      className="contents circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.back)}
                    />
                  </Link>
                </>
              }
            />
          </Portal>
        )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      installedAddons: state.addons.installedAddons,
      availableAddons: state.addons.availableAddons,
      upgradableAddons: state.addons.upgradableAddons,
      loadingAddons: state.addons.loading,
      pathname: props.location.pathname,
    }),
    { installAddon, listAddons, uninstallAddon, upgradeAddon },
  ),
)(AddonsControlpanel);
