/**
 * Login container.
 * @module components/
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { login } from 'actions';

@connect(
  state => ({
    loaded: state.login.loaded,
    error: state.login.error,
    token: state.login.token,
  }),
  dispatch => bindActionCreators({ login }, dispatch),
)
/**
 * Login container class.
 * @class Login
 * @extends Component
 */
export default class Login extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    login: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.object,
    token: PropTypes.string,
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      localStorage.setItem('auth_token', nextProps.token);
      browserHistory.push('/');
    }
  }

  /**
   * On login handler
   * @method onLogin
   * @returns {undefined}
   */
  onLogin() {
    this.props.login(document.getElementById('login').value,
                     document.getElementById('password').value);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    console.log(this.props.error);
    return (
      <div id="page-login">
        <Helmet title="Login" />
        <div className="container">
          {this.props.error &&
            <div className="portalMessage error">
              <strong>Error</strong>
               {this.props.error.message}
            </div>
          }
          <div className="field">
            <label forHtml="login" className="horizontal">
              Login Name <span className="required horizontal" title="Required">&nbsp;</span>
            </label>
              
            <input id="login" name="login" className="text-widget required textline-field" type="text" />
          </div>

          <div className="field">
            <label forHtml="password" className="horizontal">
              Password <span className="required horizontal" title="Required">&nbsp;</span>
            </label>
              
            <input id="password" name="password" className="text-widget required textline-field" type="password" />
          </div>

          <div className="formControls">
            <button className="context" onClick={::this.onLogin}>Log In</button>
          </div>
        </div>
      </div>
    );
  }
}
