/**
 * PasswordReset component.
 * @module components/theme/PasswordReset/PasswordReset
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Form } from '@plone/volto/components';
import { setInitialPassword } from '@plone/volto/actions';
import config from '@plone/volto/registry';

const messages = defineMessages({
  title: {
    id: 'Set your password',
    defaultMessage: 'Set your password',
  },
  description: {
    id: 'Please fill out the form below to set your password.',
    defaultMessage: 'Please fill out the form below to set your password.',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  usernameTitle: {
    id: 'My username is',
    defaultMessage: 'My user name is',
  },
  emailTitle: {
    id: 'My email is',
    defaultMessage: 'My email is',
  },
  usernameDescription: {
    id: 'Enter your username for verification.',
    defaultMessage: 'Enter your username for verification.',
  },
  emailDescription: {
    id: 'Enter your email for verification.',
    defaultMessage: 'Enter your email for verification.',
  },
  passwordTitle: {
    id: 'New password',
    defaultMessage: 'New password',
  },
  passwordDescription: {
    id: 'Enter your new password. Minimum 5 characters.',
    defaultMessage: 'Enter your new password. Minimum 5 characters.',
  },
  passwordRepeatTitle: {
    id: 'Confirm password',
    defaultMessage: 'Confirm password',
  },
  passwordsDoNotMatch: {
    id: 'Passwords do not match.',
    defaultMessage: 'Passwords do not match.',
  },
  mailDoNotMatch: {
    id: 'E-mail addresses do not match.',
    defaultMessage: 'E-mail addresses do not match.',
  },
  passwordRepeatDescription: {
    id: 'Re-enter the password. Make sure the passwords are identical.',
    defaultMessage:
      'Re-enter the password. Make sure the passwords are identical.',
  },
  setMyPassword: {
    id: 'Set my password',
    defaultMessage: 'Set my password',
  },
  successRedirectToLoginTitle: {
    id: 'Account activation completed',
    defaultMessage: 'Account activation completed',
  },
  successRedirectToLoginBody: {
    id:
      'Your password has been set successfully. You may now {link} with your new password.',
    defaultMessage:
      'Your password has been set successfully. You may now {link} with your new password.',
  },
  passwordReset: {
    id: 'Password reset',
    defaultMessage: 'Password reset',
  },
});

/**
 * PasswordReset class.
 * @class PasswordReset
 * @extends Component
 */
class PasswordReset extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string.isRequired,
    setInitialPassword: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    error: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Controlpanel
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: null,
      isSuccessful: false,
    };

    this.identifierField = config.settings.useEmailAsLogin
      ? 'email'
      : 'username';

    this.identifierTitle =
      this.identifierField === 'email'
        ? this.props.intl.formatMessage(messages.emailTitle)
        : this.props.intl.formatMessage(messages.usernameTitle);

    this.identifierDescription =
      this.identifierField === 'email'
        ? this.props.intl.formatMessage(messages.emailDescription)
        : this.props.intl.formatMessage(messages.usernameDescription);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.loading && nextProps.loaded) {
      this.setState({ isSuccessful: true });
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @param {object} event Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    if (data.password === data.passwordRepeat) {
      this.props.setInitialPassword(
        data[this.identifierField],
        this.props.token,
        data.password,
      );
      this.setState({
        error: null,
      });
    } else {
      this.setState({
        error: {
          message: this.props.intl.formatMessage(messages.passwordsDoNotMatch),
        },
      });
    }
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.goBack();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.state.isSuccessful) {
      return (
        <Container>
          <h1 className="documentFirstHeading">
            <FormattedMessage
              id="Account activation completed"
              defaultMessage="Account activation completed"
            />
          </h1>
          <p className="description">
            <FormattedMessage
              id="Your password has been set successfully. You may now {link} with your new password."
              defaultMessage="Your password has been set successfully. You may now {link} with your new password."
              values={{
                link: (
                  <Link to="/login">
                    {this.props.intl.formatMessage({ id: 'Log In' })}
                  </Link>
                ),
              }}
            />
          </p>
        </Container>
      );
    }
    if (this.props.token) {
      return (
        <div id="page-password-reset">
          <Helmet
            title={this.props.intl.formatMessage(messages.passwordReset)}
          />
          <Container>
            <Form
              title={this.props.intl.formatMessage(messages.title)}
              description={this.props.intl.formatMessage(messages.description)}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              error={this.state.error || this.props.error}
              schema={{
                fieldsets: [
                  {
                    id: 'default',
                    title: this.props.intl.formatMessage(messages.default),
                    fields: [
                      this.identifierField,
                      'password',
                      'passwordRepeat',
                    ],
                  },
                ],
                properties: {
                  [this.identifierField]: {
                    type: 'string',
                    title: this.identifierTitle,
                    description: this.identifierDescription,
                  },
                  password: {
                    description: this.props.intl.formatMessage(
                      messages.passwordDescription,
                    ),
                    title: this.props.intl.formatMessage(
                      messages.passwordTitle,
                    ),
                    type: 'string',
                    widget: 'password',
                  },
                  passwordRepeat: {
                    description: this.props.intl.formatMessage(
                      messages.passwordRepeatDescription,
                    ),
                    title: this.props.intl.formatMessage(
                      messages.passwordRepeatTitle,
                    ),
                    type: 'string',
                    widget: 'password',
                  },
                },
                submitLabel: this.props.intl.formatMessage(
                  messages.setMyPassword,
                ),
                required: [this.identifierField, 'password', 'passwordRepeat'],
              }}
            />
          </Container>
        </div>
      );
    }
    return <div />;
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      loading: state.users.initial.loading,
      loaded: state.users.initial.loaded,
      error: state.users.initial.error,
      token: props.match.params.token,
    }),
    { setInitialPassword },
  ),
)(PasswordReset);
