/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import qs from 'query-string';

import { Login } from '@plone/volto/components';
import { logout, purgeMessages } from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

const messages = defineMessages({
  loggedOut: {
    id: 'Logged out',
    defaultMessage: 'Logged out',
  },
  loggedOutContent: {
    id: 'You have been logged out from the site.',
    defaultMessage: 'You have been logged out from the site.',
  },
});

/**
 * Logout function.
 * @function Logout
 */

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    props.purgeMessages();
  }, []);

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */

  useEffect(() => {
    if (!props.token) {
      props.history.replace(props.returnUrl || '/');
      if (!toast.isActive('loggedOut')) {
        toast.info(
          <Toast
            info
            title={props.intl.formatMessage(messages.loggedOut)}
            content={props.intl.formatMessage(messages.loggedOutContent)}
          />,
          { autoClose: false, toastId: 'loggedOut' },
        );
      }
    }
  }, [props]);

  /**
   * Render method.
   * @method return similar to render in Class Component
   * @returns {string} Markup for the component.
   */
  return <Login location={{ query: props.location.query }} />;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  purgeMessages: PropTypes.func.isRequired,
  query: PropTypes.shape({
    return_url: PropTypes.string,
  }),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 */

Logout.defaultProps = {
  query: null,
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      query: qs.parse(props.location.search),
      token: state.userSession.token,
      returnUrl:
        qs.parse(props.location.search).return_url ||
        props.location.pathname
          .replace(/\/login\/?$/, '')
          .replace(/\/logout\/?$/, '') ||
        '/',
    }),
    { logout, purgeMessages },
  ),
)(Logout);
