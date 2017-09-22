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
import { browserHistory } from 'react-router';
import { isEmpty } from 'lodash';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { login } from '../../../actions';

/**
 * LoginComponent class.
 * @class LoginComponent
 * @extends Component
 */
@connect(
  state => ({
    error: state.userSession.login.error,
    token: state.userSession.token,
  }),
  dispatch => bindActionCreators({ login }, dispatch),
)
export class LoginComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    token: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    error: null,
    token: null,
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
   * 
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      browserHistory.push('/');
    }
  }

  /**
   * On login handler
   * @method onLogin
   * @param {Object} event Event object.
   * 
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
        <div className="container">
          {this.props.error && (
            <div className="portalMessage error">
              <strong>Error</strong>
              {this.props.error.message}
            </div>
          )}
          <Form method="post" onSubmit={this.onLogin}>
            <Segment attached="top">
              <Form.Field>
                <label htmlFor="login">
                  <FormattedMessage
                    id="Login Name"
                    defaultMessage="Login Name"
                  />
                </label>
                <Input id="login" name="login" />
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">
                  <FormattedMessage id="Password" defaultMessage="Password" />
                </label>
                <Input type="password" id="password" name="password" />
              </Form.Field>
            </Segment>
            <Segment attached="bottom">
              <Button primary type="submit">
                <FormattedMessage id="Log in" defaultMessage="Log in" />
              </Button>
            </Segment>
          </Form>
        </div>
      </div>
    );
  }
}

export default asyncConnect([
  {
    key: 'userSession',
    promise: ({ store: { dispatch, getState } }) => {
      const form = getState().form;
      if (!isEmpty(form)) {
        return dispatch(login(form.login, form.password));
      }
      return Promise.resolve({});
    },
  },
])(LoginComponent);
