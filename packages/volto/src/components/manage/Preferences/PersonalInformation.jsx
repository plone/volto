import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { messages } from '@plone/volto/helpers';
import { Toast } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import { getUser, updateUser, getUserSchema } from '@plone/volto/actions';

const PersonalInformation = ({
  getUser,
  getUserSchema,
  userId,
  updateUser,
  closeMenu,
  onNavigate,
  intl,
  user,
  userschema,
  loading,
}) => {
  useEffect(() => {
    getUser(userId);
    getUserSchema();
  }, [getUser, getUserSchema, userId]);

  const onSubmit = (data) => {
    const { id, username, roles, ...cleanedData } = data;
    updateUser(userId, cleanedData);
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.saved)}
      />,
    );
    if (closeMenu) closeMenu();
  };

  const onCancel = () => {
    if (closeMenu) {
      closeMenu();
    } else if (onNavigate) {
      onNavigate(-1);
    }
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
  user: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    home_page: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserSchema: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  closeMenu: PropTypes.func,
  onNavigate: PropTypes.func,
  intl: PropTypes.object.isRequired,
  userschema: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    user: state.users.user,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    loaded: state.users.get.loaded,
    loading: state.users.update.loading,
    userschema: state.userschema,
  }),
  { getUser, updateUser, getUserSchema },
)(injectIntl(PersonalInformation));
