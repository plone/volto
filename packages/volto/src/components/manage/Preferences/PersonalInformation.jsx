/**
 * Personal information component.
 * @module components/manage/Preferences/PersonalInformation
 */

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

/**
 * PersonalInformation functional component.
 * @function PersonalInformation
 * @param {Object} props Component properties
 */
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
  /**
   * Effect to fetch user data and schema on component mount
   * @method useEffect
   */
  useEffect(() => {
    getUser(userId);
    getUserSchema();
  }, [getUser, getUserSchema, userId]);

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  const onSubmit = (data) => {
    // We don't want the user to change his login name/username or the roles
    // from this form
    // Backend will complain anyways, but we clean the data here before it does
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

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel = () => {
    if (closeMenu) {
      closeMenu();
    } else if (onNavigate) {
      onNavigate(-1);
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {JSX.Element} Markup for the component.
   */
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
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

/**
 * Connected PersonalInformation component.
 * @function connect
 * @param {function} mapStateToProps - Redux state to props mapping.
 * @param {Object} actions - Redux actions.
 * @returns {function} Connected PersonalInformation component.
 */
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
