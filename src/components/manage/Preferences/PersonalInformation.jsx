/**
 * Personal information component.
 * @module components/manage/Preferences/PersonalInformation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { messages } from '@plone/volto/helpers';
import { Form, Toast } from '@plone/volto/components';
import { getUser, updateUser, getUserSchema } from '@plone/volto/actions';

/**
 * PersonalInformation class.
 * @class PersonalInformation
 * @extends Component
 */
class PersonalInformation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    user: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      home_page: PropTypes.string,
      location: PropTypes.string,
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    closeMenu: PropTypes.func,
    getUserSchema: PropTypes.func.isRequired,
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

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getUserSchema();
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    // We don't want the user to change his login name/username or the roles
    // from this form
    // Backend will complain anyways, but we clean the data here before it does
    delete data.id;
    delete data.username;
    delete data.roles;
    this.props.updateUser(this.props.userId, data);
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.saved)}
      />,
    );
    if (this.props.closeMenu) this.props.closeMenu();
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    if (this.props.closeMenu) this.props.closeMenu();
    else this.props.history.goBack();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props?.userschema?.loaded && (
        <Form
          formData={this.props.user}
          schema={this.props?.userschema.userschema}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          loading={this.props.loading}
        />
      )
    );
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser, getUserSchema },
  ),
)(PersonalInformation);
