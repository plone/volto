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

const Logout = ({
  logout,
  purgeMessages,
  query,
  token,
  returnUrl,
  history,
  location,
  intl,
}) => {
  useEffect(() => {
    logout();
    purgeMessages();
  }, []);

  useEffect(() => {
    if (!token) {
      history.replace(returnUrl || '/');
      if (!toast.isActive('loggedOut')) {
        toast.info(
          <Toast
            info
            title={intl.formatMessage(messages.loggedOut)}
            content={intl.formatMessage(messages.loggedOutContent)}
          />,
          { autoClose: false, toastId: 'loggedOut' },
        );
      }
    }
  }, [token, history, returnUrl, intl]);

  return <Login location={{ query: location.query }} />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  purgeMessages: PropTypes.func.isRequired,
  query: PropTypes.shape({
    return_url: PropTypes.string,
  }),
  token: PropTypes.string,
  returnUrl: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

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
