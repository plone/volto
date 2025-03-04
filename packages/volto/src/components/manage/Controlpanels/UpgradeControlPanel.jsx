/**
 * Upgrade controlpanel container.
 * @module components/manage/Controlpanels/Upgrade
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Button,
  Container,
  Form,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';

import {
  getSystemInformation,
  getUpgradeInformation,
  runUpgrade,
} from '@plone/volto/actions';
import { Helmet } from '@plone/volto/helpers';
import { Icon, Toast, Toolbar, VersionOverview } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';
import { toast } from 'react-toastify';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  upgradeInformation: {
    id: 'Upgrade Plone Site',
    defaultMessage: 'Upgrade Plone Site',
  },
  upgrade: {
    id: 'Upgrade Plone Site',
    defaultMessage: 'Upgrade Plone Site',
  },
  upgradeSuccess: {
    id: 'Your site is up to date.',
    defaultMessage: 'Your site is up to date.',
  },
  dryRunSuccess: {
    id: 'Dry run selected, transaction aborted.',
    defaultMessage: 'Dry run selected, transaction aborted.',
  },
  upgradeError: {
    id: 'There was an error with the upgrade.',
    defaultMessage: 'There was an error with the upgrade.',
  },
});

const UpgradeStep = ({ title, steps }) => {
  const stepTitles = steps.map((step) => {
    return step.title;
  });
  return (
    <Message>
      <Message.Header>{title}</Message.Header>
      <Message.List items={stepTitles} />
    </Message>
  );
};

/**
 * UpgradeControlPanel class.
 * @class UpgradeControlPanel
 * @extends Component
 */
class UpgradeControlPanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getUpgradeInformation: PropTypes.func.isRequired,
    getSystemInformation: PropTypes.func.isRequired,
    runUpgrade: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs DiffComponent
   */
  constructor(props) {
    super(props);
    this.runUpgrade = this.runUpgrade.bind(this);
    this.state = {
      isClient: false,
      dryRun: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getUpgradeInformation();
    this.props.getSystemInformation();
    this.setState({ isClient: true, dryRun: false });
  }

  /**
   * Run Upgrade handler
   * @method runUpgrade
   * @param {boolean} dryRun Id of package to install.
   * @returns {undefined}
   */
  runUpgrade(dryRun) {
    this.props
      .runUpgrade(dryRun)
      .then(() => {
        if (!dryRun) {
          // Upgrade completed
          this.props.getUpgradeInformation();
          toast.success(
            <Toast
              success
              title={this.props.intl.formatMessage(messages.upgrade)}
              content={this.props.intl.formatMessage(messages.upgradeSuccess)}
            />,
          );
        } else {
          toast.success(
            <Toast
              success
              title={this.props.intl.formatMessage(messages.upgrade)}
              content={this.props.intl.formatMessage(messages.dryRunSuccess)}
            />,
          );
        }
      })
      .catch(() => {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.upgrade)}
            content={this.props.intl.formatMessage(messages.upgradeError)}
          />,
        );
      });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const upgradeInformation = this.props.upgradeInformation;
    const upgradeSteps = upgradeInformation
      ? Object.entries(upgradeInformation.upgrade_steps)
      : null;
    return upgradeInformation ? (
      <Container id="upgrade-page" className="controlpanel-upgrade">
        <Helmet
          title={this.props.intl.formatMessage(messages.upgradeInformation)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Upgrade Plone Site"
              defaultMessage="Upgrade Plone Site"
            />
          </Segment>
          <Segment className="secondary">
            <FormattedMessage
              id="More information about the upgrade procedure can be found in the documentation section of plone.org in the Upgrade Guide."
              defaultMessage="More information about the upgrade procedure can be found in the documentation section of plone.org in the Upgrade Guide."
            />
          </Segment>
          <Message attached>
            <Message.Header>
              <FormattedMessage
                id="Configuration Versions"
                defaultMessage="Configuration Versions"
              />
            </Message.Header>
          </Message>
          <Segment>
            {upgradeInformation.versions.fs ===
            upgradeInformation.versions.instance ? (
              <Message attached success>
                <FormattedMessage
                  id="Your site is up to date."
                  defaultMessage="Your site is up to date."
                />
              </Message>
            ) : (
              <Message attached warning>
                <FormattedMessage
                  id="The site configuration is outdated and needs to be upgraded."
                  defaultMessage="The site configuration is outdated and needs to be upgraded."
                />
              </Message>
            )}
            <Table celled padded columns="2">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Current active configuration"
                      defaultMessage="Current active configuration"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {upgradeInformation.versions.instance}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Latest available configuration"
                      defaultMessage="Latest available configuration"
                    />
                  </Table.Cell>
                  <Table.Cell>{upgradeInformation.versions.fs}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
          {upgradeSteps.length > 0 && (
            <>
              <Message attached>
                <Message.Header>
                  <FormattedMessage
                    id="Upgrade Steps"
                    defaultMessage="Upgrade Steps"
                  />
                </Message.Header>
                <Message.Content>
                  <FormattedMessage
                    id="The following list shows which upgrade steps are going to be run. Upgrading sometimes performs a catalog/security update, which may take a long time on large sites. Be patient."
                    defaultMessage="The following list shows which upgrade steps are going to be run. Upgrading sometimes performs a catalog/security update, which may take a long time on large sites. Be patient."
                  />
                </Message.Content>
              </Message>
              <Segment>
                <Container>
                  {map(upgradeSteps, (upgradeGroup) => [
                    <UpgradeStep
                      title={upgradeGroup[0]}
                      steps={upgradeGroup[1]}
                    />,
                  ])}
                </Container>
                <Message negative>
                  <FormattedMessage
                    id="Please ensure you have a backup of your site before performing the upgrade."
                    defaultMessage="Please ensure you have a backup of your site before performing the upgrade."
                  />
                </Message>
                <Form.Checkbox
                  onChange={(e, data) =>
                    this.setState({ dryRun: data.checked })
                  }
                  checked={this.state.dryRun}
                  label="Dry run mode"
                />
                <br />
                <Button
                  aria-label={this.props.intl.formatMessage({
                    id: 'Upgrade',
                    defaultMessage: 'Upgrade',
                  })}
                  onClick={() => this.runUpgrade(this.state.dryRun)}
                  primary
                >
                  <FormattedMessage id="Upgrade" defaultMessage="Upgrade" />
                </Button>
              </Segment>
            </>
          )}
          {this.props.upgradeReport ? (
            <>
              <Message attached>
                <Message.Header>
                  <FormattedMessage
                    id="Upgrade Report"
                    defaultMessage="Upgrade Report"
                  />
                </Message.Header>
              </Message>
              <Segment>
                <pre>{this.props.upgradeReport.report}</pre>
              </Segment>
            </>
          ) : null}
          <Message attached>
            <Message.Header>
              <FormattedMessage
                id="Version Overview"
                defaultMessage="Version Overview"
              />
            </Message.Header>
          </Message>
          <Segment>
            {this.props.systemInformation ? (
              <VersionOverview {...this.props.systemInformation} />
            ) : null}
          </Segment>
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
    ) : null;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      upgradeInformation: state.upgrade.upgradeinformation,
      pathname: props.location.pathname,
      systemInformation: state.controlpanels.systeminformation,
      upgradeReport: state.upgrade.upgradereport,
    }),
    { getUpgradeInformation, getSystemInformation, runUpgrade },
  ),
)(UpgradeControlPanel);
