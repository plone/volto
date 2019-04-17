/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/AddonsControlpanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Accordion,
  Button,
  Divider,
  Header,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { installAddon, listAddons, uninstallAddon } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import { Icon, Toolbar } from '../../../components';
import circleBottomSVG from '../../../icons/circle-bottom.svg';
import circleTopSVG from '../../../icons/circle-top.svg';


const messages = defineMessages({
  activateAndDeactivate: {
    id: 'Activate and deactivate',
    defaultMessage: 'Activate and deactivate add-ons in the lists below.',
  },
  addAddons: {
    id: 'Add Addons',
    defaultMessage:
      'To make new add-ons show up here, add them to your buildout configuration, run buildout, and restart the server process. For detailed instructions see',
  },
  addonsSettings: {
    id: 'Add-ons Settings',
    defaultMessage: 'Add-ons Settings',
  },
  available: {
    id: 'Available',
    defaultMessage: 'Available',
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
    id: 'Installed Version',
    defaultMessage: 'Installed Version',
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
});

@injectIntl
@connect(
  (state, props) => ({
    installedAddons: state.addons.installedAddons,
    availableAddons: state.addons.availableAddons,
    upgradableAddons: state.addons.upgradableAddons,
    pathname: props.location.pathname,
  }),
  dispatch =>
    bindActionCreators({ installAddon, listAddons, uninstallAddon }, dispatch),
)
/**
 * AddonsControlpanel class.
 * @class AddonsControlpanel
 * @extends Component
 */
export default class AddonsControlpanel extends Component {
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
    this.state = {
      activeIndex: -1,
      installedAddons: [],
      availableAddons: [],
      upgradableAddons: [],
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.listAddons();
  }

  componentWillReceiveProps(nextProps) {
    console.log('in componentWillReceiveProps');
    console.log(nextProps);
  }

  /**
   * Install handler
   * @method onInstall
   * @param {Object} event Event object.
   * @param {string} value Install value.
   * @returns {undefined}
   */
  onInstall(event, { value }) {
    event.preventDefault();
    this.props.installAddon(value).then(() => this.props.listAddons());
  }

  /**
   * Uninstall handler
   * @method onUninstall
   * @param {Object} event Event object.
   * @param {string} value Uninstall value.
   * @returns {undefined}
   */
  onUninstall(event, { value }) {
    event.preventDefault();
    this.props.uninstallAddon(value).then(() => this.props.listAddons());
  }

  /**
   * On accordion click handler
   * @method onAccordionClick
   * @param {object} event Event object.
   * @param {object} index Index of the accordion element being clicked
   * @returns {undefined}
   */
  onAccordionClick(event, index) {
    const { activeIndex } = this.state.activeIndex;
    const newIndex = activeIndex === index.index ? -1 : index.index;
    this.setState({ activeIndex: newIndex });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-addons">
        <Helmet title="Addons" />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Add-ons Settings"
              defaultMessage="Add-ons Settings"
            />
          </Segment>
          {this.props.upgradableAddons.length > 0 && (
            <Message icon="info" attached>
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
              defaultMessage="To make new add-ons show up here, add them to your buildout configuration, run buildout, and restart the server process. For detailed instructions see"
            />
            &nbsp;
            <a href="http://docs.plone.org/manage/installing/installing_addons.html" target="_blank">
              Installing a third party add-on
            </a>
            .
          </Segment>

          <Segment key="header-installed" secondary>
            <FormattedMessage id="Installed" defaultMessage="Installed" />:
            <Label circular>{this.props.installedAddons.length}</Label>
          </Segment>

          <Segment key="body-installed" attached>
            <Accordion>
              <Divider />
              {this.props.installedAddons.map(item => (
                <div key={item.id}>
                  <Accordion.Title
                    active={this.state.activeIndex === item.id}
                    index={item.id}
                    onClick={this.onAccordionClick}
                  >
                    {item.title}
                    {item.upgrade_info.available && (
                      <Label as="a">
                        {/* <Icon name="circle" /> */}
                        <FormattedMessage id="Update" defaultMessage="Update" />
                      </Label>
                    )}
                    <Icon
                      name={
                        this.state.activeIndex === item.id
                          ? circleTopSVG
                          : circleBottomSVG
                      }
                      size="24px"
                      floated="right"
                    />
                  </Accordion.Title>
                  <Accordion.Content
                    active={this.state.activeIndex === item.id}
                  >
                    {item.description}
                    <FormattedMessage
                      id="Installed Version"
                      defaultMessage="Installed Version"
                    />
                    &nbsp;
                    {item.version}
                    {item.upgrade_info.available && (
                      <Button primary>
                        <FormattedMessage id="Update" defaultMessage="Update" />
                      </Button>
                    )}
                    <Button primary onClick={this.onUninstall} value={item.id}>
                      <FormattedMessage
                        id="Uninstall"
                        defaultMessage="Uninstall"
                      />
                    </Button>
                  </Accordion.Content>
                  <Divider />
                </div>
              ))}
            </Accordion>
          </Segment>

          <Segment key="header-available" secondary>
            <FormattedMessage id="Available" defaultMessage="Available" />:
            <Label circular>{this.props.availableAddons.length}</Label>
          </Segment>

          <Segment key="body-available" attached>
            <Accordion>
              <Divider />
              {this.props.availableAddons.map(item => (
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
                      size="24px"
                      floated="right"
                    />
                  </Accordion.Title>
                  <Accordion.Content
                    active={this.state.activeIndex === item.id}
                  >
                    {item.description}

                    <FormattedMessage
                      id="Installed Version"
                      defaultMessage="Installed Version"
                    />
                    {item.version}
                    <Button primary onClick={this.onInstall} value={item.id}>
                      <FormattedMessage id="Install" defaultMessage="Install" />
                    </Button>
                  </Accordion.Content>
                  <Divider />
                </div>
              ))}
            </Accordion>
          </Segment>
        </Segment.Group>

        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link to={`${getBaseUrl(this.props.pathname)}`} className="item">
                {/* <Icon
                  name="arrow left"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.back)}
                /> */}
              </Link>
            }
          />
        </Portal>
      </div>
    );
  }
}
