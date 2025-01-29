import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { logout } from '@plone/volto/actions/userSession/userSession';
import { purgeMessages } from '@plone/volto/actions/messages/messages';
import { toast } from 'react-toastify';

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

const Logout = ({ location }) => {
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const intl = useIntl();

  const returnUrl = useMemo(
    () =>
      qs.parse(location.search).return_url ||
      location.pathname
        .replace(/\/login\/?$/, '')
        .replace(/\/logout\/?$/, '') ||
      '/',
    [location],
  );

  useEffect(() => {
    dispatch(logout());
    dispatch(purgeMessages());
  }, [dispatch]);

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
  }, [history, returnUrl, intl, token]);

  return '';
};

export default Logout;
