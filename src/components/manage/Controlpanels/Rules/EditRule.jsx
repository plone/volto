/**
 * Edit content rule component.
 * @module components/manage/Controlpanels/Rules/EditRule
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
                          value={''}
                          required
                          onChange={() => console.log('coco')}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          title={'Description'}
                          description="Enter a short description of the rule and its purpose."
                          value={''}
                          onChange={() => console.log('description handle')}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Field
                          required
                          title={'Triggering event'}
                          description="The rule will execute when the following event occurs."
                          choices={[['value', 'label']]}
                          onChange={(e, v) => console.log('event handle', v)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Segment>
              <Segment>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Checkbox
                    onChange={(e, { value }) => console.log(value)}
                    value={''}
                    label={'Enabled'}
                    //checked={}
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
                    onChange={(e, { value }) => console.log(value)}
                    value={''}
                    label={'Stop Executing rules'}
                    //checked={}
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
                    onChange={(e, { value }) => console.log(value)}
                    value={''}
                    label={'Cascading rule'}
                    //checked={}
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
                <Button onClick={() => console.log('handleasave')} primary>
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
)(EditRule);
