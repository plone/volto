/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch ,useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
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
 * Logout class.
 * @class Logout
 * @extends Component
 */
const Logout=({ location ,history })=> {
  const { token} = useSelector(
    (state) => ({
       token :   state.userSession.token,
    }));
   
    const returnUrl =
    qs.parse(location.search).return_url ||
    location.pathname
      .replace(/\/login\/?$/, '')
      .replace(/\/logout\/?$/, '') ||
    '/';

 const dispatch=useDispatch();
 const intl=useIntl();

 useEffect(()=>{

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
 },[token])
 
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  
    return <Login location={{ query: location.query }} />;
}

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
    Logout.propTypes = {
    logout: PropTypes.func,
    purgeMessages: PropTypes.func,
    query: PropTypes.shape({
      return_url: PropTypes.string,
    }),
  };
  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  Logout.defaultProps = {
    query: null,
  };
export default Logout;
