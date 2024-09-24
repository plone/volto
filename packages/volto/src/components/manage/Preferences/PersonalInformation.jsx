import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { messages } from '@plone/volto/helpers';
import { Toast } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import { getUser, updateUser, getUserSchema } from '@plone/volto/actions';

const PersonalInformation = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  const loading = useSelector((state) => state.users.update.loading);
  const userschema = useSelector((state) => state.userschema);

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getUserSchema());
  }, [dispatch, userId]);

  const onSubmit = (data) => {
    delete data.id;
    delete data.username;
    delete data.roles;
    dispatch(updateUser(userId, data)).then(() =>
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.saved)}
        />,
      ),
    );
    if (props.closeMenu) props.closeMenu();
  };

  const onCancel = () => {
    if (props.closeMenu) props.closeMenu();
    else history.goBack();
  };

  return (
    userschema?.loaded && (
      <Form
        formData={user}
        schema={userschema.userschema}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    )
  );
};

PersonalInformation.propTypes = {
  closeMenu: PropTypes.func,
};

export default PersonalInformation;
