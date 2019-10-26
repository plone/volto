/**
 * Register container.
 * @module components/theme/Register/Register
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Toast } from '../../../components';
import { createUser, getGlobalState } from '../../../actions';

const messages = defineMessages({
  title: {
    id: 'Registration form',
    defaultMessage: 'Registration form',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fullnameTitle: {
    id: 'Full Name',
    defaultMessage: 'Full Name',
  },
  fullnameDescription: {
    id: 'Enter full name, e.g. John Smith.',
    defaultMessage: 'Enter full name, e.g. John Smith.',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id:
      'Enter an email address. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
    defaultMessage:
      'Enter an email address. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
  },
  successRegisterCompletedTitle: {
    id: 'Account Registration Completed',
    defaultMessage: 'Account Registration Completed',
  },
  successRegisterCompletedBody: {
    id:
      'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
    defaultMessage:
      'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
  },
  usernameTitle: {
    id: 'Username',
    defaultMessage: 'Username',
  },
  usernameDescription: {
    id:
      'Enter a username. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
    defaultMessage:
      'Enter a username. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
  },
  passwordTitle: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  passwordDescription: {
    id: 'Enter a password.',
    defaultMessage: 'Enter a password.',
  },
  verifyPasswordTitle: {
    id: 'Verify Password',
    defaultMessage: 'Verify Password',
  },
  verifyPasswordDescription: {
    id: 'Enter your password again.',
    defaultMessage: 'Enter your password again.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
});

/**
 * Register class.
 * @class Register
 * @extends Component
 */
class Register extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    getGlobalState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
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
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateRegistrationForm = this.generateRegistrationForm.bind(this);
    this.state = {
      error: null,
    };
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.loading && nextProps.loaded) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(
            messages.successRegisterCompletedTitle,
          )}
          content={this.props.intl.formatMessage(
            messages.successRegisterCompletedBody,
          )}
        />,
      );
      this.props.history.push('/login');
    }
  }

  /**
   * On submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.createUser({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    });
    this.setState({
      error: null,
    });
  }

  /**
   * Create registration form
   * @method generateRegistrationForm
   * @returns {array} Form definition
   */
  generateRegistrationForm() {
    let form = {
      fieldsets: [
        {
          id: 'default',
          title: this.props.intl.formatMessage(messages.default),
          fields: ['fullname'],
        },
      ],
      properties: {
        fullname: {
          type: 'string',
          title: this.props.intl.formatMessage(messages.fullnameTitle),
          description: this.props.intl.formatMessage(
            messages.fullnameDescription,
          ),
        },
      },
      required: ['fullname', 'email'],
    };
    if (this.props.use_email_for_login) {
      form['fieldsets'][0].fields.push('email');
      form['properties']['email'] = {
        type: 'string',
        title: this.props.intl.formatMessage(messages.emailTitle),
        description: this.props.intl.formatMessage(messages.emailDescription),
      };
      form['required'].push('email');
    } else {
      form['fieldsets'][0].fields.push('username');
      form['properties']['username'] = {
        type: 'string',
        title: this.props.intl.formatMessage(messages.usernameTitle),
        description: this.props.intl.formatMessage(
          messages.usernameDescription,
        ),
      };
      form['required'].push('username');
    }

    if (this.props.can_set_password) {
      form['fieldsets'][0].fields.push('password');
      form['properties']['password'] = {
        type: 'password',
        title: this.props.intl.formatMessage(messages.passwordTitle),
        description: this.props.intl.formatMessage(
          messages.passwordDescription,
        ),
      };
      form['required'].push('password');

      form['fieldsets'][0].fields.push('verify_password');
      form['properties']['verify_password'] = {
        type: 'password',
        title: this.props.intl.formatMessage(messages.verifyPasswordTitle),
        description: this.props.intl.formatMessage(
          messages.verifyPasswordDescription,
        ),
      };
      form['required'].push('verify_password');
    }

    return form;
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.can_register) {
      return (
        <div id="page-register">
          <Helmet title="Register" />
          <Form
            onSubmit={this.onSubmit}
            title={this.props.intl.formatMessage(messages.title)}
            error={this.state.error || this.props.error}
            loading={this.props.loading}
            submitLabel={this.props.intl.formatMessage(messages.register)}
            schema={this.generateRegistrationForm()}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    state => ({
      loading: state.users.create.loading,
      loaded: state.users.create.loaded,
      error: state.users.create.error,
      can_register: state.global.can_register,
      can_set_password: state.global.can_set_password,
      use_email_for_login: state.global.use_email_for_login,
    }),
    { createUser, getGlobalState },
  ),
)(Register);
