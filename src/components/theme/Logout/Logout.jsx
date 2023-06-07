import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';
import { Login } from '@plone/volto/components';
import { logout, purgeMessages } from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { useToken } from '@plone/volto/hooks/userSession/useToken';

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

const Logout = ({ location, history }) => {
  const token = useToken();

  const returnUrl =
    qs.parse(location.search).return_url ||
    location.pathname.replace(/\/login\/?$/, '').replace(/\/logout\/?$/, '') ||
    '/';

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    dispatch(logout());
    dispatch(purgeMessages());

    if (token) {
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
  }, [dispatch, history, returnUrl, intl, token]);

  return <Login location={{ query: location.query }} />;
};

Logout.propTypes = {
  logout: PropTypes.func,
  purgeMessages: PropTypes.func,
  query: PropTypes.shape({
    return_url: PropTypes.string,
  }),
};

Logout.defaultProps = {
  query: null,
};
export default Logout;
