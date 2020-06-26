/**
 * RequestPasswordReset component.
 * @module components/theme/RequestPasswordReset/RequestPasswordReset
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Form } from '@plone/volto/components';
import { resetPassword } from '@plone/volto/actions';

const messages = defineMessages({
  title: {
    id: 'box_forgot_password_option',
    defaultMessage: 'Forgot your password?',
  },
  description: {
    id: 'description_lost_password',
    defaultMessage:
      'For security reasons, we store your password encrypted, and cannot mail it to you. If you would like to reset your password, fill out the form below and we will send you an email at the address you gave when you registered to start the process of resetting your password.',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  emailTitle: {
    id: 'label_my_email_address_is',
    defaultMessage: 'My email address is',
  },
  sendEmail: {
    id: 'Start password reset',
    defaultMessage: 'Start password reset',
  },
  emailrequired: {
    id: 'Your email is required for reset your password.',
    defaultMessage: 'Your email is required for reset your password.',
  },
  passwordReset: {
    id: 'Password reset',
    defaultMessage: 'Password reset',
  },
});

/**
 * RequestPasswordReset class.
 * @class RequestPasswordReset
 * @extends Component
 */
class RequestPasswordReset extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.string,
    resetPassword: PropTypes.func.isRequired,
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
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {}

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
    if (data.email) {
      this.props.resetPassword(data.email);
      this.setState({
        error: null,
      });
    } else {
      this.setState({
        error: {
          message: this.props.intl.formatMessage(messages.emailrequired),
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
              id="heading_sent_password"
              defaultMessage="Password reset confirmation sent"
            />
          </h1>
          <p className="description">
            <FormattedMessage
              id="description_sent_password"
              defaultMessage="Your password reset request has been mailed. It should arrive in your mailbox shortly. When you receive the message, visit the address it contains to reset your password."
            />
          </p>
        </Container>
      );
    }

    return (
      <div id="page-password-reset">
        <Helmet title={this.props.intl.formatMessage(messages.passwordReset)} />
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
                  fields: ['email'],
                },
              ],
              properties: {
                email: {
                  type: 'string',
                  title: this.props.intl.formatMessage(messages.emailTitle),
                },
              },
              submitLabel: this.props.intl.formatMessage(messages.sendEmail),
              required: ['email'],
            }}
          />
        </Container>
      </div>
    );
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state) => ({
      loading: state.users.reset.loading,
      loaded: state.users.reset.loaded,
      error: state.users.reset.error,
    }),
    { resetPassword },
  ),
)(RequestPasswordReset);
