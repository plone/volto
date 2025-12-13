/**
 * PasswordReset component.
 * @module components/theme/PasswordReset/PasswordReset
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Form } from '@plone/volto/components/manage/Form';
import { setInitialPassword } from '@plone/volto/actions/users/users';
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
    id: 'Enter your new password. Minimum 8 characters.',
    defaultMessage: 'Enter your new password. Minimum 8 characters.',
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
    id: 'Your password has been set successfully. You may now {link} with your new password.',
    defaultMessage:
      'Your password has been set successfully. You may now {link} with your new password.',
  },
  passwordReset: {
    id: 'Password reset',
    defaultMessage: 'Password reset',
  },
});

/**
 * @function PasswordReset
 * @param {Object} props
 * @returns {JSX.Element}
 */
function PasswordReset(props) {
  const { loading, loaded, error, token, setInitialPassword, history } = props;

  const [localError, setLocalError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const intl = useIntl();

  const identifierField = config.settings.useEmailAsLogin
    ? 'email'
    : 'username';

  const identifierTitle =
    identifierField === 'email'
      ? intl.formatMessage(messages.emailTitle)
      : intl.formatMessage(messages.usernameTitle);

  const identifierDescription =
    identifierField === 'email'
      ? intl.formatMessage(messages.emailDescription)
      : intl.formatMessage(messages.usernameDescription);

  useEffect(() => {
    if (!loading && loaded) {
      setIsSuccessful(true);
    }
  }, [loading, loaded]);

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  const onSubmit = (data) => {
    if (data.password === data.passwordRepeat) {
      setInitialPassword(data[identifierField], token, data.password);
      setLocalError(null);
    } else {
      setLocalError({
        message: intl.formatMessage(messages.passwordsDoNotMatch),
      });
    }
  };

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel = () => {
    history.goBack();
  };

  if (isSuccessful) {
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
                <Link to="/login">{intl.formatMessage({ id: 'Log In' })}</Link>
              ),
            }}
          />
        </p>
      </Container>
    );
  }

  if (token) {
    const errmsg = error ? error.response?.body?.error || error : null;
    return (
      <div id="page-password-reset">
        <Helmet title={intl.formatMessage(messages.passwordReset)} />
        <Container>
          <Form
            title={intl.formatMessage(messages.title)}
            description={intl.formatMessage(messages.description)}
            onSubmit={onSubmit}
            onCancel={onCancel}
            error={localError || errmsg}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: intl.formatMessage(messages.default),
                  fields: [identifierField, 'password', 'passwordRepeat'],
                },
              ],
              properties: {
                [identifierField]: {
                  type: 'string',
                  title: identifierTitle,
                  description: identifierDescription,
                },
                password: {
                  description: intl.formatMessage(messages.passwordDescription),
                  title: intl.formatMessage(messages.passwordTitle),
                  type: 'string',
                  widget: 'password',
                },
                passwordRepeat: {
                  description: intl.formatMessage(
                    messages.passwordRepeatDescription,
                  ),
                  title: intl.formatMessage(messages.passwordRepeatTitle),
                  type: 'string',
                  widget: 'password',
                },
              },
              submitLabel: intl.formatMessage(messages.setMyPassword),
              required: [identifierField, 'password', 'passwordRepeat'],
            }}
          />
        </Container>
      </div>
    );
  }

  return <div />;
}

PasswordReset.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.object,
  token: PropTypes.string.isRequired,
  setInitialPassword: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

PasswordReset.defaultProps = {
  error: null,
};

export default compose(
  withRouter,
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
