/**
 * Rules container.
 * @module components/manage/Rules/Rules
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container,
  Segment,
  Select,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { getBaseUrl } from '@plone/volto/helpers';
import {
  addRule,
  getRules,
  enableRules,
  disableRules,
  applyRulesToSubfolders,
  unapplyRulesToSubfolders,
  removeRules,
} from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import checkSVG from '@plone/volto/icons/check.svg';

import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  rules: {
    id: 'Rules',
    defaultMessage: 'Rules',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  add: {
    id: 'Added',
    defaultMessage: 'Added',
  },
  enable: {
    id: 'Enabled',
    defaultMessage: 'Enabled',
  },
  disable: {
    id: 'Disabled',
    defaultMessage: 'Disabled',
  },
  apply: {
    id: 'Applied to subfolders',
    defaultMessage: 'Applied to subfolders',
  },
  unapply: {
    id: 'Disabled apply to subfolders',
    defaultMessage: 'Disabled apply to subfolders',
  },
  remove: {
    id: 'Unassigned',
    defaultMessage: 'Unassigned',
  },
});

/**
 * Rules class.
 * @class Rules
 * @extends Component
 */
class Rules extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getRules: PropTypes.func.isRequired,
    addRule: PropTypes.func.isRequired,
    enableRules: PropTypes.func.isRequired,
    disableRules: PropTypes.func.isRequired,
    applyRulesToSubfolders: PropTypes.func.isRequired,
    unapplyRulesToSubfolders: PropTypes.func.isRequired,
    removeRules: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Rules
   */
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
      checkedRules: [],
      newRule: '',
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getRules(getBaseUrl(this.props.pathname));
    this.setState({ isClient: true });
  }

  componentDidUpdate(prevProps, prevState) {}

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.rules.add.loading && nextProps.rules.add.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ newRule: '' });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.add)}
        />,
      );
    }
    if (this.props.rules.disable.loading && nextProps.rules.disable.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ checkedRules: [] });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.disable)}
        />,
      );
    }
    if (this.props.rules.enable.loading && nextProps.rules.enable.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ checkedRules: [] });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.enable)}
        />,
      );
    }
    if (this.props.rules.apply.loading && nextProps.rules.apply.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ checkedRules: [] });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.apply)}
        />,
      );
    }
    if (this.props.rules.unapply.loading && nextProps.rules.unapply.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ checkedRules: [] });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.unapply)}
        />,
      );
    }

    if (this.props.rules.remove.loading && nextProps.rules.remove.loaded) {
      this.props.getRules(getBaseUrl(this.props.pathname));
      this.setState({ checkedRules: [] });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.remove)}
        />,
      );
    }
  }

  /**
   * Rule check handler
   * @method handleCheckRule
   * @returns {undefined}
   */
  handleCheckRule = (rule) => {
    const rules = this.state.checkedRules;
    if (rules.includes(rule)) {
      const index = rules.indexOf(rule);
      if (index > -1) {
        let newRules = rules;
        newRules.splice(index, 1);
        this.setState({ checkedRules: newRules });
      }
    } else {
      this.setState({
        checkedRules: [...this.state.checkedRules, rule],
      });
    }
  };

  /**
   * Disable rules handler
   * @method handleDisableRules
   * @returns {undefined}
   */
  handleDisableRules = () => {
    this.props.disableRules(
      getBaseUrl(this.props.pathname),
      this.state.checkedRules,
    );
  };

  /**
   * Enable rules handler
   * @method handleEnableRules
   * @returns {undefined}
   */
  handleEnableRules = () => {
    this.props.enableRules(
      getBaseUrl(this.props.pathname),
      this.state.checkedRules,
    );
  };

  /**
   * Apply rules to subfolder handler
   * @method handleApplyToSubfolder
   * @returns {undefined}
   */
  handleApplyToSubfolder = () => {
    this.props.applyRulesToSubfolders(
      getBaseUrl(this.props.pathname),
      this.state.checkedRules,
    );
  };

  /**
   * Unapply rules to subfolder handler
   * @method handleUnapplyToSubfolder
   * @returns {undefined}
   */
  handleUnapplyToSubfolder = () => {
    this.props.unapplyRulesToSubfolders(
      getBaseUrl(this.props.pathname),
      this.state.checkedRules,
    );
  };

  /**
   * Remove rules handler
   * @method handleRemoveRules
   * @returns {undefined}
   */
  handleRemoveRules = () => {
    this.props.removeRules(
      getBaseUrl(this.props.pathname),
      this.state.checkedRules,
    );
  };

  /**
   * Remove rules handler
   * @method handleAddRule
   * @returns {undefined}
   */
  handleAddRule = () => {
    this.props.addRule(getBaseUrl(this.props.pathname), this.state.newRule);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { acquired_rules, assigned_rules, assignable_rules } =
      this.props.rules?.rules || {};
    return (
      <Container id="rules">
        <Helmet title={this.props.intl.formatMessage(messages.rules)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Content rules for {title}"
              defaultMessage="Content rules for {title}"
              values={{ title: <q>{this.props.title}</q> }}
            />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="The following content rules are active in this Page. Use the content rules control panel to create new rules or delete or modify existing ones."
              defaultMessage="The following content rules are active in this Page. Use the content rules control panel to create new rules or delete or modify existing ones."
            />
          </Segment>
        </Segment.Group>

        {acquired_rules && acquired_rules.length > 0 && (
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>
                  <FormattedMessage
                    id="Content rules from parent folders"
                    defaultMessage="Content rules from parent folders"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <FormattedMessage id="Active" defaultMessage="Active" />
                </Table.HeaderCell>
              </Table.Row>

              {acquired_rules.map((rule, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    {/* this can be a link to the control panel */}
                    {rule.title}({rule.trigger})
                  </Table.Cell>
                  <Table.Cell>
                    {rule.enabled && (
                      <span style={{ color: 'green' }}>
                        <Icon
                          name={checkSVG}
                          className="contents circled"
                          size="10px"
                        />
                      </span>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {assignable_rules && assignable_rules.length > 0 && (
          <Segment>
            <FormattedMessage
              id="Available content rules:"
              defaultMessage="Available content rules:"
            />
            <div style={{ display: 'flex' }}>
              <Select
                placeholder="Select rule"
                value={this.state.newRule}
                onChange={(e, { value }) => this.setState({ newRule: value })}
                options={assignable_rules.map((rule, i) => {
                  return { key: rule.id, value: rule.id, text: rule.title };
                })}
              />
              <Button
                onClick={this.handleAddRule}
                primary
                style={{ marginLeft: '10px' }}
              >
                <FormattedMessage id="Add" defaultMessage="Add" />
              </Button>
            </div>
          </Segment>
        )}
        {assigned_rules && assigned_rules.length > 0 && (
          <React.Fragment>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage id="Select" defaultMessage="Select" />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Active content rules in this Page"
                      defaultMessage="Active content rules in this Page"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Applies to subfolders?"
                      defaultMessage="Applies to subfolders?"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Enabled here?"
                      defaultMessage="Enabled here?"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="Enabled?" defaultMessage="Enabled?" />
                  </Table.HeaderCell>
                </Table.Row>
                {assigned_rules.map((rule, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Checkbox
                        onChange={(o, { value }) => this.handleCheckRule(value)}
                        value={rule.id}
                        checked={this.state.checkedRules.includes(rule.id)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {rule.title}({rule.trigger})
                    </Table.Cell>
                    <Table.Cell>
                      {rule.bubbles && (
                        <span style={{ color: 'green' }}>
                          <Icon
                            name={checkSVG}
                            className="contents circled"
                            size="10px"
                          />
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {rule.enabled && (
                        <span style={{ color: 'green' }}>
                          <Icon
                            name={checkSVG}
                            className="contents circled"
                            size="10px"
                          />
                        </span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {rule.global_enabled && (
                        <span style={{ color: 'green' }}>
                          <Icon
                            name={checkSVG}
                            className="contents circled"
                            size="10px"
                          />
                        </span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Button onClick={this.handleEnableRules} primary>
              <FormattedMessage id="Enable" defaultMessage="Enable" />
            </Button>
            <Button onClick={this.handleDisableRules} primary>
              <FormattedMessage id="Disable" defaultMessage="Disable" />
            </Button>
            <Button onClick={this.handleApplyToSubfolder} primary>
              <FormattedMessage
                id="Apply to subfolders"
                defaultMessage="Apply to subfolders"
              />
            </Button>
            <Button onClick={this.handleUnapplyToSubfolder} primary>
              <FormattedMessage
                id="Disable apply to subfolders"
                defaultMessage="Disable apply to subfolders"
              />
            </Button>
            <Button color="youtube" onClick={this.handleRemoveRules}>
              <FormattedMessage id="Unassign" defaultMessage="Unassign" />
            </Button>
          </React.Fragment>
        )}
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link
                  to={`${getBaseUrl(this.props.pathname)}`}
                  className="item"
                >
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
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
      rules: state.rules,
      pathname: props.location.pathname,
      title: state.content.data?.title || '',
    }),
    {
      addRule,
      getRules,
      enableRules,
      disableRules,
      applyRulesToSubfolders,
      unapplyRulesToSubfolders,
      removeRules,
    },
  ),
)(Rules);
