/**
 * Add content rule component.
 * @module components/manage/Controlpanels/Rules/AddRule
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
  Grid,
  Header,
  Input,
  Label,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import {
  Icon,
  Toolbar,
  FormFieldWrapper,
  Field,
} from '@plone/volto/components';
import { eventTriggers } from './constants';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  addRule: {
    id: 'Add Content Rule',
    defaultMessage: 'Add Content Rule',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

/**
 * AddRule class.
 * @class AddRule
 * @extends Component
 */
class AddRule extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {};

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
      title: '',
      description: '',
      event: '',
      cascading: false,
      stop: false,
      enabled: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {}

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {}

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { title, description, event, cascading, stop, enabled } = this.state;

    return (
      <div id="page-rule-add">
        <Helmet title={this.props.intl.formatMessage(messages.addRule)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage id="Add Rule" defaultMessage="Add Rule" />
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
                          onChange={(e, d) => this.setState({ title: d })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          required
                          title={'Triggering event'}
                          description="The rule will execute when the following event occurs."
                          choices={eventTriggers}
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
                <Button onClick={() => console.log('handleadd')} primary>
                  <FormattedMessage id="Save" defaultMessage="Save" />
                </Button>
                <Button onClick={() => this.onCancel()} secondary>
                  <FormattedMessage id="Cancel" defaultMessage="Cancel" />
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
      pathname: props.location.pathname,
    }),
    {},
  ),
)(AddRule);
