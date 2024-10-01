import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Helmet } from '@plone/volto/helpers/Helmet/Helmet';
import { usePrevious } from '@plone/volto/helpers/Utils/usePrevious';
import { Form } from '@plone/volto/components/manage/Form';
import { resetPassword } from '@plone/volto/actions/users/users';
import config from '@plone/volto/registry';

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
  usernameTitle: {
    id: 'label_my_username_is',
    defaultMessage: 'My user name is',
  },
  emailTitle: {
    id: 'label_my_email_is',
    defaultMessage: 'My email is',
  },
  sendEmail: {
    id: 'Start password reset',
    defaultMessage: 'Start password reset',
  },
  usernameRequired: {
    id: 'Your usernaame is required for reset your password.',
    defaultMessage: 'Your username is required for reset your password.',
  },
  emailRequired: {
    id: 'Your email is required for reset your password.',
    defaultMessage: 'Your email is required for reset your password.',
  },
  passwordReset: {
    id: 'Password reset',
    defaultMessage: 'Password reset',
  },
});

const useUsers = () => {
  const loading = useSelector((state) => state.users.reset.loading);
  const loaded = useSelector((state) => state.users.reset.loaded);
  const error = useSelector((state) => state.users.reset.error);

  return { loading, loaded, error };
};

const RequestPasswordReset = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSuccessful, setisSuccessful] = useState(false);
  const history = useHistory();
  const identifierTitle = useRef();
  const identifierRequiredMessage = useRef();
  const { loaded, loading, error: props_error } = useUsers();
  const prevloading = usePrevious(loading);

  const identifierField = config.settings.useEmailAsLogin
    ? 'email'
    : 'username';

  if (identifierField === 'email') {
    identifierTitle.current = intl.formatMessage(messages.emailTitle);
    identifierRequiredMessage.current = intl.formatMessage(
      messages.emailRequired,
    );
  } else {
    identifierTitle.current = intl.formatMessage(messages.usernameTitle);
    identifierRequiredMessage.current = intl.formatMessage(
      messages.usernameRequired,
    );
  }

  useEffect(() => {
    if (prevloading && loaded) setisSuccessful(true);
  }, [prevloading, loaded]);

  const onSubmit = (data) => {
    if (data[identifierField]) {
      dispatch(resetPassword(data[identifierField]));
      setError(null);
    } else {
      setError({
        message: identifierRequiredMessage.current,
      });
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  if (isSuccessful) {
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
      <Helmet title={intl.formatMessage(messages.passwordReset)} />
      <Container>
        <Form
          title={intl.formatMessage(messages.title)}
          description={intl.formatMessage(messages.description)}
          onSubmit={onSubmit}
          onCancel={onCancel}
          error={error || props_error}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: intl.formatMessage(messages.default),
                fields: [identifierField],
              },
            ],
            properties: {
              [identifierField]: {
                type: 'string',
                title: identifierTitle.current,
              },
            },
            submitLabel: intl.formatMessage(messages.sendEmail),
            required: [identifierField],
          }}
        />
      </Container>
    </div>
  );
};

export default RequestPasswordReset;
