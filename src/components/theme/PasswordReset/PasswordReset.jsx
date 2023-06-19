import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Form } from '@plone/volto/components';
import { setInitialPassword } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import { Helmet } from '@plone/volto/helpers';
import { useUsers } from '@plone/volto/hooks/users/useUsers';
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

const PasswordReset = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [errors, setError] = useState(null);
  const [isSuccessful, setisSuccessful] = useState(false);
  const token = props.match.params.token;

  const { loading, loaded, error } = useUsers();
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
    if (loaded) setisSuccessful(true);
  }, [loading, loaded]);

  const onSubmit = (data) => {
    if (data.password === data.passwordRepeat) {
      dispatch(setInitialPassword(data[identifierField], token, data.password));
      setError(null);
    } else {
      setError(intl.formatMessage(messages.passwordsDoNotMatch));
    }
  };

  const onCancel = () => {
    props.history.goBack();
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
    const errmsg = error ? error.response.body.error : null;
    return (
      <div id="page-password-reset">
        <Helmet title={intl.formatMessage(messages.passwordReset)} />
        <Container>
          <Form
            title={intl.formatMessage(messages.title)}
            description={intl.formatMessage(messages.description)}
            onSubmit={onSubmit}
            onCancel={onCancel}
            error={errors || errmsg}
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
};

PasswordReset.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  token: PropTypes.string,
  setInitialPassword: PropTypes.func,
};

PasswordReset.defaultProps = {
  error: null,
};

export default PasswordReset;
