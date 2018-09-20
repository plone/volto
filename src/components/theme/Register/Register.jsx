/**
 * Register container.
 * @module components/theme/Register/Register
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

import { Form } from '../../../components';
import { createUser, addMessage } from '../../../actions';

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
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
});

@injectIntl
@connect(
  state => ({
    loading: state.users.create.loading,
    loaded: state.users.create.loaded,
    error: state.users.create.error,
  }),
  dispatch => bindActionCreators({ createUser, addMessage }, dispatch),
)
/**
 * Register class.
 * @class Register
 * @extends Component
 */
export default class Register extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    intl: intlShape.isRequired,
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
      this.props.addMessage(
        this.props.intl.formatMessage(messages.successRegisterCompletedTitle),
        this.props.intl.formatMessage(messages.successRegisterCompletedBody),
        'success',
      );
      Router.push('/login');
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-register">
        <Helmet title="Register" />
        <Form
          onSubmit={this.onSubmit}
          title={this.props.intl.formatMessage(messages.title)}
          error={this.state.error || this.props.error}
          loading={this.props.loading}
          submitLabel={this.props.intl.formatMessage(messages.register)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['fullname', 'email'],
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
              email: {
                type: 'string',
                title: this.props.intl.formatMessage(messages.emailTitle),
                description: this.props.intl.formatMessage(
                  messages.emailDescription,
                ),
              },
            },
            required: ['fullname', 'email'],
          }}
        />
      </div>
    );
  }
}
