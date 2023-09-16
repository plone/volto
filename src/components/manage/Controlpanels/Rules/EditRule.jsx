/**
 * Edit content rule component.
 * @module components/manage/Controlpanels/Rules/EditRule
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getParentUrl, Helmet, getBaseUrl } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Icon, Toolbar, Field } from '@plone/volto/components';
import {
  getControlPanelRule,
  editRule,
  getContentRulesEvents,
} from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  configRule: {
    id: 'Configure Content Rule',
    defaultMessage: 'Configure Content Rule',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Rule edited',
  },
});

/**
 * EditRule class.
 * @class EditRule
 * @extends Component
 */
class EditRule extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getContentRulesEvents: PropTypes.func.isRequired,
    editRule: PropTypes.func.isRequired,
    getControlPanelRule: PropTypes.func.isRequired,
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
      id: '',
      isClient: false,
      title: '',
      description: '',
      event: '',
      cascading: false,
      stop: false,
      enabled: false,
      invalidForm: true,
      invalidTitle: false,
      invalidEvent: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
    this.props.getControlPanelRule(
      getBaseUrl(this.props.pathname),
      this.props?.match?.params?.id,
    );
    this.props.getContentRulesEvents(getBaseUrl(this.props.pathname));
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rule !== this.props.rule) {
      const { title, description, event, cascading, stop, enabled, id } =
        this.props.rule.item || {};
      this.setState({
        id,
        title,
        description,
        event,
        cascading,
        stop,
        enabled,
      });
    }

    if (
      prevState.title !== this.state.title ||
      prevState.event !== this.state.event
    ) {
      if (this.state.title && this.state.event) {
        this.setState({
          invalidForm: false,
          invalidTitle: false,
          invalidEvent: false,
        });
      } else {
        if (!this.state.title) {
          this.setState({ invalidForm: true, invalidTitle: true });
        }
        if (!this.state.event) {
          this.setState({ invalidForm: true, invalidEvent: true });
        }
      }
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.rule.edit.loading && nextProps.rule.edit.loaded) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.edit)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
  }

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(getParentUrl(this.props.pathname)));
  }

  /**
   * Update rule handler
   * @method handleUpdate
   * @returns {undefined}
   */
  handleUpdate() {
    const {
      id,
      title,
      description,
      event,
      cascading,
      stop,
      enabled,
      invalidForm,
    } = this.state;
    const data = { title, description, event, cascading, enabled, stop };

    if (!invalidForm) {
      this.props.editRule(getBaseUrl(this.props.pathname), data, id);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { title, description, event, cascading, stop, enabled } = this.state;

    const triggeringEvents =
      this.props.events?.items && this.props.events?.items.length > 0
        ? this.props.events?.items.map((event) => [event.token, event.title])
        : '';

    return (
      <div id="page-rule-edit">
        <Helmet title={this.props.intl.formatMessage(messages.configRule)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage id="Edit Rule" defaultMessage="Edit Rule" />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Use the form below to define the new content rule"
                  defaultMessage="Use the form below to define the new content rule"
                />
              </Segment>
              <Segment>
                <Form>
                  <Grid>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          title={'Title'}
                          description="Please set a descriptive title for the rule."
                          value={title}
                          required
                          onChange={(e, t) => this.setState({ title: t })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          title={'Description'}
                          description="Enter a short description of the rule and its purpose."
                          value={description}
                          onChange={(e, d) => this.setState({ description: d })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          required
                          title={'Triggering event'}
                          description="The rule will execute when the following event occurs."
                          choices={triggeringEvents}
                          value={event}
                          onChange={(e, v) => this.setState({ event: v })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Segment>
              <Segment>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox
                    onChange={(e, { checked }) =>
                      this.setState({ enabled: checked })
                    }
                    label={'Enabled'}
                    checked={enabled}
                  />
                  <p
                    style={{
                      color: '#878f93',
                      paddingTop: '0.7rem',
                      paddingBottom: '0.7rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <FormattedMessage
                      id="Whether or not the rule is currently enabled"
                      defaultMessage="Whether or not the rule is currently enabled"
                    />
                  </p>
                </div>
              </Segment>
              <Segment>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox
                    onChange={(e, { checked }) =>
                      this.setState({ stop: checked })
                    }
                    label={'Stop Executing rules'}
                    checked={stop}
                  />
                  <p
                    style={{
                      color: '#878f93',
                      paddingTop: '0.7rem',
                      paddingBottom: '0.7rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <FormattedMessage
                      id="Whether or not execution of further rules should stop after this rule is executed"
                      defaultMessage="Whether or not execution of further rules should stop after this rule is executed"
                    />
                  </p>
                </div>
              </Segment>
              <Segment>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox
                    onChange={(e, { checked }) =>
                      this.setState({ cascading: checked })
                    }
                    label={'Cascading rule'}
                    checked={cascading}
                  />
                  <p
                    style={{
                      color: '#878f93',
                      paddingTop: '0.7rem',
                      paddingBottom: '0.7rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    <FormattedMessage
                      id="Whether or not other rules should be triggered by the actions launched by this rule. Activate this only if you are sure this won't create infinite loops"
                      defaultMessage="Whether or not other rules should be triggered by the actions launched by this rule. Activate this only if you are sure this won't create infinite loops"
                    />
                  </p>
                </div>
              </Segment>
              <Segment>
                <Button onClick={() => this.handleUpdate()} primary>
                  <FormattedMessage id="Save" defaultMessage="Save" />
                </Button>
                <Button onClick={() => this.onCancel()} secondary>
                  <FormattedMessage id="Cancel" defaultMessage="Cancel" />
                </Button>
              </Segment>
              <Segment>
                {this.state.invalidTitle && (
                  <p style={{ color: 'red' }}>
                    <FormattedMessage
                      id="Title field error. Value not provided or already existing."
                      defaultMessage="Title field error. Value not provided or already existing."
                    />
                  </p>
                )}
                {this.state.invalidEvent && (
                  <p style={{ color: 'red' }}>
                    <FormattedMessage
                      id="Triggering event field error. Please select a value"
                      defaultMessage="Triggering event field error. Please select a value"
                    />
                  </p>
                )}
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
      events: state.contentrulesevents,
      rule: state.controlpanelrule,
      pathname: props.location.pathname,
    }),
    { getControlPanelRule, getContentRulesEvents, editRule },
  ),
)(EditRule);
