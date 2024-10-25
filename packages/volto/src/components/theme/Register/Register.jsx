import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Helmet, usePrevious } from '@plone/volto/helpers';
import { Toast } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import { createUser, getUserSchema } from '@plone/volto/actions';

const messages = defineMessages({
  title: {
    id: 'Registration form',
    defaultMessage: 'Registration form',
  },
  successRegisterCompletedTitle: {
    id: 'Account Registration Completed',
    defaultMessage: 'Account Registration Completed',
  },
  successRegisterCompletedBody: {
    id: 'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
    defaultMessage:
      'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
});
const useUsers = () => {
  const error = useSelector((state) => state.users.create.error);
  const loading = useSelector((state) => state.users.create.loading);
  const loaded = useSelector((state) => state.users.create.loaded);

  return { error, loaded, loading };
};
const Register = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const [errors, setError] = useState(null);
  const { loaded, loading, error } = useUsers();

  const prevloading = usePrevious(loading);
  const userschema = useSelector((state) => state.userschema);

  useEffect(() => {
    if (!userschema.loading && !userschema.loaded) {
      dispatch(getUserSchema());
    }
  }, [userschema, dispatch]);

  useEffect(() => {
    if (prevloading && loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.successRegisterCompletedTitle)}
          content={intl.formatMessage(messages.successRegisterCompletedBody)}
        />,
      );
      history.push('/login');
    }
  }, [intl, history, loaded, prevloading]);

  const onSubmit = (data) => {
    const { fullname, email } = data;
    dispatch(
      createUser({
        fullname: fullname,
        email: email,
        sendPasswordReset: true,
      }),
    );
    setError(null);
  };

  const emptySchema = {
    fieldsets: [],
    properties: {},
    required: [],
  };

  return (
    <div id="page-register">
      <Helmet title={intl.formatMessage(messages.register)} />
      <Form
        onSubmit={onSubmit}
        title={intl.formatMessage(messages.title)}
        error={errors || error}
        loading={loading}
        submitLabel={intl.formatMessage(messages.register)}
        schema={userschema.loaded ? userschema.userschema : emptySchema}
      />
    </div>
  );
};

export default Register;
