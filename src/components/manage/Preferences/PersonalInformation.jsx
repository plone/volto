/**
 * Personal information component.
 * @module components/manage/Preferences/PersonalInformation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { messages, asyncConnect } from '@plone/volto/helpers';
import { getUser, updateUser, getUserSchema } from '@plone/volto/actions';
import { Form, Toast } from '@plone/volto/components';
import config from '@plone/volto/registry';

const personalInformatioNMessages = defineMessages({
  personalInformationFor: {
    id: 'Personal Information for',
    defaultMessage: 'Personal Information for {fullname} ({username})',
  },
});

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
    if (this.props.error && this.props.error.status) {
      const { views } = config;
      const ErrorView = views.errorViews[this.props.error.status.toString()];
      return <ErrorView />;
    }

    const title = this.props.match.params.username
      ? this.props.intl.formatMessage(
          personalInformatioNMessages.personalInformationFor,
          {
            username: this.props.user.username,
            fullname: this.props.user.fullname
              ? this.props.user.fullname
              : this.props.user.email,
          },
        )
      : null;

    return (
      this.props?.userschema?.loaded && (
        <Form
          title={title}
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

export const __test__ = compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      user: state.users.user,
      error: state.users.get.error,
      userId: props.match.params.username
        ? props.match.params.username
        : state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser },
  ),
)(PersonalInformation);

export default compose(
  withRouter,
  injectIntl,
  asyncConnect([
    {
      key: 'user',
      promise: async ({ store: { dispatch }, match }) =>
        await dispatch(getUser(match.params.username)),
    },
    {
      key: 'userschema',
      promise: async ({ store: { dispatch } }) =>
        await dispatch(getUserSchema()),
    },
  ]),
  connect(
    (state, props) => ({
      user: state.users.user,
      error: state.users.get.error,
      userId: props.match.params.username
        ? props.match.params.username
        : state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      loaded: state.users.get.loaded,
      loading: state.users.update.loading,
      userschema: state.userschema,
    }),
    { getUser, updateUser },
  ),
)(PersonalInformation);
