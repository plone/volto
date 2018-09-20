/**
 * Change password component.
 * @module components/manage/Preferences/ChangePassword
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Container, Icon, Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';

import { Form, Toolbar } from '../../../components';
import { updatePassword, addMessage } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  changePassword: {
    id: 'Change Password',
    defaultMessage: 'Change Password',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  oldPasswordTitle: {
    id: 'Current password',
    defaultMessage: 'Current password',
  },
  oldPasswordDescription: {
    id: 'Enter your current password.',
    defaultMessage: 'Enter your current password.',
  },
  newPasswordTitle: {
    id: 'New password',
    defaultMessage: 'New password',
  },
  newPasswordDescription: {
    id: 'Enter your new password. Minimum 5 characters.',
    defaultMessage: 'Enter your new password. Minimum 5 characters.',
  },
  newPasswordRepeatTitle: {
    id: 'Confirm password',
    defaultMessage: 'Confirm password',
  },
  newPasswordRepeatDescription: {
    id: 'Re-enter the password. Make sure the passwords are identical.',
    defaultMessage:
      'Re-enter the password. Make sure the passwords are identical.',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    loading: state.users.update_password.loading,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ updatePassword, addMessage }, dispatch),
)
/**
 * ChangePassword class.
 * @class ChangePassword
 * @extends Component
 */
export default class ChangePassword extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    userId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    updatePassword: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ChangePassword
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    if (data.newPassword === data.newPasswordRepeat) {
      this.props.updatePassword(
        this.props.userId,
        data.oldPassword,
        data.newPassword,
      );
      this.props.addMessage(
        null,
        this.props.intl.formatMessage(messages.saved),
        'success',
      );
    }
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    Router.goBack();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-change-password">
        <Helmet
          title={this.props.intl.formatMessage(messages.changePassword)}
        />
        <Menu attached="top" tabular stackable>
          <Link to="/personal-information" className="item">
            <FormattedMessage
              id="Personal Information"
              defaultMessage="Personal Information"
            />
          </Link>
          <Link to="/personal-preferences" className="item">
            <FormattedMessage
              id="Personal Preferences"
              defaultMessage="Personal Preferences"
            />
          </Link>
          <Menu.Item
            name={this.props.intl.formatMessage(messages.changePassword)}
            active
          />
        </Menu>
        <Form
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['oldPassword', 'newPassword', 'newPasswordRepeat'],
              },
            ],
            properties: {
              oldPassword: {
                description: this.props.intl.formatMessage(
                  messages.oldPasswordDescription,
                ),
                title: this.props.intl.formatMessage(messages.oldPasswordTitle),
                type: 'string',
                widget: 'password',
              },
              newPassword: {
                description: this.props.intl.formatMessage(
                  messages.newPasswordDescription,
                ),
                title: this.props.intl.formatMessage(messages.newPasswordTitle),
                type: 'string',
                widget: 'password',
              },
              newPasswordRepeat: {
                description: this.props.intl.formatMessage(
                  messages.newPasswordRepeatDescription,
                ),
                title: this.props.intl.formatMessage(
                  messages.newPasswordRepeatTitle,
                ),
                type: 'string',
                widget: 'password',
              },
            },
            required: ['oldPassword', 'newPassword', 'newPasswordRepeat'],
          }}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          loading={this.props.loading}
        />
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link to={`${getBaseUrl(this.props.pathname)}`} className="item">
                <Icon
                  name="arrow left"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      </Container>
    );
  }
}
