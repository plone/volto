/**
 * Moderate content rules component.
 * @module components/manage/Controlpanels/Rules/Rules
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getBaseUrl, getParentUrl, Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import {
  getControlPanelRules,
  deleteControlPanelRule,
} from '@plone/volto/actions';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  rules: {
    id: 'Content Rules',
    defaultMessage: 'Content Rules',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  delete: {
    id: 'Deleted',
    defaultMessage: 'Deleted',
  },
});

const filterChoices = [
  { label: 'Comment Added', value: 'comment-added' },
  { label: 'Comment removed', value: 'comment-removed' },
  { label: 'Comment reply added', value: 'comment-reply-added' },
  { label: 'User Created', value: 'user-created' },
  { label: 'Enabled', value: 'enabled' },
  { label: 'Disabled', value: 'disabled' },
];

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
    getControlPanelRules: PropTypes.func.isRequired,
    deleteControlPanelRule: PropTypes.func.isRequired,
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
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getControlPanelRules(getBaseUrl(this.props.pathname));

    this.setState({ isClient: true });
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.rules !== this.props.rules) {
    //   console.log('rules', this.props.rules.items);
    // }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.indivRule.delete.loading &&
      nextProps.indivRule.delete.loaded
    ) {
      this.props.getControlPanelRules(getBaseUrl(this.props.pathname));

      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.delete)}
        />,
      );
    }
  }

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  /**
   * Select filter type handler
   * @method handleSelectFilterType
   * @returns {undefined}
   */
  handleSelectFilterType(type) {
    this.setState({ filterType: type });
  }

  /**
   * Add Rule handler
   * @method handleAddRule
   * @returns {undefined}
   */
  handleAddRule() {
    this.props.history.push(`${this.props.pathname}/add`);
  }

  /**
   * Configure Rule handler
   * @method handleConfigure
   * @returns {undefined}
   */
  handleConfigure(ruleId) {
    this.props.history.push(`${this.props.pathname}/${ruleId}/configure`);
  }

  /**
   * Edit Rule handler
   * @method handleEdit
   * @returns {undefined}
   */
  handleEdit(ruleId) {
    this.props.history.push(`${this.props.pathname}/${ruleId}/edit`);
  }

  /**
   * Delete Rule handler
   * @method handleEdit
   * @returns {undefined}
   */
  handleDelete(ruleId) {
    this.props.deleteControlPanelRule(getBaseUrl(this.props.pathname), ruleId);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-rules">
        <Helmet title={this.props.intl.formatMessage(messages.rules)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Content Rules"
                  defaultMessage="Content Rules"
                />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Use the form below to define, change or remove content rules. Rules will automatically perform actions on content when certain triggers take place. After defining rules, you may want to go to a folder to assign them, using the 'rules' item in the actions menu."
                  defaultMessage="Use the form below to define, change or remove content rules. Rules will automatically perform actions on content when certain triggers take place. After defining rules, you may want to go to a folder to assign them, using the 'rules' item in the actions menu."
                />
              </Segment>
              <Segment>
                <Checkbox
                  onChange={(e, { value }) => console.log(value)}
                  //checked={}
                  value={'disable-globally'}
                  label="Disable globally"
                />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Whether or not content rules should be disabled globally. If this is selected, no rules will be executed anywhere in the portal."
                  defaultMessage="Whether or not content rules should be disabled globally. If this is selected, no rules will be executed anywhere in the portal."
                />
              </Segment>
              <Segment>
                <Header size="small">
                  <FormattedMessage
                    id="Filter Rules:"
                    defaultMessage="Filter Rules:"
                  />
                </Header>
                {filterChoices.map((o, i) => (
                  <Form.Field key={i}>
                    <Checkbox
                      onChange={(e, { value }) => console.log(value)}
                      //checked={}
                      value={o.value}
                      label={o.label}
                    />
                  </Form.Field>
                ))}
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.HeaderCell>
                        <FormattedMessage
                          id="Content Rule"
                          defaultMessage="Content Rule"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Event" defaultMessage="Event" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Status" defaultMessage="Status" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage
                          id="Actions"
                          defaultMessage="Actions"
                        />
                      </Table.HeaderCell>
                    </Table.Row>
                    {this.props.rules &&
                      this.props.rules.items &&
                      this.props.rules.items.length > 0 &&
                      this.props.rules.items.map((rule, i) => (
                        <Table.Row key={i}>
                          <Table.Cell>
                            <p style={{ fontSize: '16px' }}>{rule.title}</p>
                            <p style={{ fontSize: '14px' }}>
                              {rule.description}
                            </p>
                          </Table.Cell>
                          <Table.Cell>
                            <p>{rule.trigger}</p>
                          </Table.Cell>
                          <Table.Cell>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Checkbox
                                // onChange={(e, { value }) =>
                                //   console.log('handle enable/disable', !value)
                                // }
                                checked={rule.enabled}
                                value={rule.enabled}
                                label="enabled"
                              />
                              {!rule.assigned && (
                                <p
                                  style={{
                                    marginLeft: '5px',
                                    padding: '3px',
                                    backgroundColor: '#ffc106',
                                    borderRadius: '5px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  not assigned
                                </p>
                              )}
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <div style={{ display: 'flex' }}>
                              <Button
                                size="mini"
                                primary
                                onClick={() => this.handleConfigure(rule.id)}
                              >
                                Configure
                              </Button>
                              <Button
                                size="mini"
                                secondary
                                onClick={() => this.handleEdit(rule.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="mini"
                                color="youtube"
                                onClick={() => this.handleDelete(rule.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
                <Button onClick={() => this.handleAddRule()} primary>
                  <FormattedMessage
                    id="Add content rule"
                    defaultMessage="Add content rule"
                  />
                </Button>
              </Segment>
            </Segment.Group>
          </article>
        </Container>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link className="item" to="#" onClick={() => this.onCancel()}>
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
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      indivRule: state.controlpanelrule,
      rules: state.controlpanelrules,
      pathname: props.location.pathname,
    }),
    {
      getControlPanelRules,
      deleteControlPanelRule,
    },
  ),
)(Rules);
