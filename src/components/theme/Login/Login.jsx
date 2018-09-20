/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  Container,
  Button,
  Form,
  Input,
  Message,
  Segment,
  Grid,
} from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';

import { login, purgeMessages } from '../../../actions';

const messages = defineMessages({
  login: {
    id: 'Log in',
    defaultMessage: 'Log in',
  },
  loginName: {
    id: 'Login Name',
    defaultMessage: 'Login Name',
  },
  password: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    error: state.userSession.login.error,
    loading: state.userSession.login.loading,
    token: state.userSession.token,
    returnUrl: qs.parse(props.location.search).return_url || '/',
  }),
  dispatch => bindActionCreators({ login, purgeMessages }, dispatch),
)
/**
 * LoginComponent class.
 * @class LoginComponent
 * @extends Component
 */
export class LoginComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    login: PropTypes.func.isRequired,
    purgeMessages: PropTypes.func.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    token: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    intl: intlShape.isRequired,
    returnUrl: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    error: null,
    loading: null,
    token: null,
    returnUrl: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.history.push(this.props.returnUrl || '/');
      this.props.purgeMessages();
    }
  }

  /**
   * On login handler
   * @method onLogin
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onLogin(event) {
    this.props.login(
      document.getElementsByName('login')[0].value,
      document.getElementsByName('password')[0].value,
    );
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-login">
        <Helmet title="Login" />
        <Container text>
          <Form method="post" onSubmit={this.onLogin}>
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage id="Log In" defaultMessage="Login Name" />
              </Segment>
              {this.props.error && (
                <Message
                  icon="warning"
                  negative
                  attached
                  header={this.props.intl.formatMessage(messages.error)}
                  content={this.props.error.message}
                />
              )}
              <Segment secondary>
                <FormattedMessage
                  id="Sign in to start session"
                  defaultMessage="Sign in to start session"
                />
              </Segment>
              <Segment className="form">
                <Form.Field inline className="help">
                  <Grid>
                    <Grid.Row stretched>
                      <Grid.Column width="4">
                        <div className="wrapper">
                          <label htmlFor="login">
                            <FormattedMessage
                              id="Login Name"
                              defaultMessage="Login Name"
                            />
                          </label>
                        </div>
                      </Grid.Column>
                      <Grid.Column width="8">
                        <Input
                          id="login"
                          name="login"
                          placeholder={this.props.intl.formatMessage(
                            messages.loginName,
                          )}
                          tabIndex={1}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column stretched width="12">
                        <p className="help">
                          <FormattedMessage
                            id="If you you do not have an account here, head over to the {registrationform}."
                            defaultMessage="If you you do not have an account here, head over to the {registrationform}."
                            values={{
                              registrationform: (
                                <Link to="/register">
                                  <FormattedMessage
                                    id="registration form"
                                    defaultMessage="registration form"
                                  />
                                </Link>
                              ),
                            }}
                          />
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form.Field>
                <Form.Field inline className="help">
                  <Grid>
                    <Grid.Row stretched>
                      <Grid.Column stretched width="4">
                        <div className="wrapper">
                          <label htmlFor="password">
                            <FormattedMessage
                              id="Password"
                              defaultMessage="Password"
                            />
                          </label>
                        </div>
                      </Grid.Column>
                      <Grid.Column stretched width="8">
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          placeholder={this.props.intl.formatMessage(
                            messages.password,
                          )}
                          tabIndex={2}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                      <Grid.Column stretched width="12">
                        <p className="help">
                          <FormattedMessage
                            id="If you have forgotten your password, {forgotpassword}"
                            defaultMessage="If you have forgotten your password, {forgotpassword}"
                            values={{
                              forgotpassword: (
                                <Link to="/password-reset">
                                  <FormattedMessage
                                    id="we can send you a new one"
                                    defaultMessage="we can send you a new one"
                                  />
                                </Link>
                              ),
                            }}
                          />
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form.Field>
              </Segment>
              <Segment clearing className="actions">
                <Button
                  basic
                  circular
                  primary
                  id="login-form-submit"
                  icon="arrow right"
                  floated="right"
                  size="big"
                  type="submit"
                  title={this.props.intl.formatMessage(messages.login)}
                  loading={this.props.loading}
                />
                <Button
                  basic
                  circular
                  secondary
                  as={Link}
                  to="/"
                  id="login-form-cancel"
                  icon="remove"
                  floated="right"
                  size="big"
                  title={this.props.intl.formatMessage(messages.cancel)}
                />
              </Segment>
            </Segment.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default asyncConnect([
  {
    key: 'userSession',
    promise: ({ store: { dispatch, getState } }) => {
      const { form } = getState();
      if (!isEmpty(form)) {
        return dispatch(login(form.login, form.password));
      }
      return Promise.resolve({});
    },
  },
])(withRouter(LoginComponent));
