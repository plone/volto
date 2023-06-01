/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';
import { useSelector, shallowEqual } from 'react-redux';

/**
 * Anontools function.
 * @function Anontools
 * @
 * @returns {string} Markup of the component.
 */
const Anontools = ()=> {

  const { token,content } = useSelector(
    (state) => ({
      token: state.userSession.token,
      content:state.content.data,
    }),
    shallowEqual,
  );

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

    const { settings } = config;
    return (
      !token && (
        <Menu pointing secondary floated="right">
          <Menu.Item>
            <Link
              aria-label="login"
              to={`/login${
                content?.['@id']
                  ? `?return_url=${content['@id'].replace(
                      settings.apiPath,
                      '',
                    )}`
                  : ''
              }`}
            >
              <FormattedMessage id="Log in" defaultMessage="Log in" />
            </Link>
          </Menu.Item>
          {settings.showSelfRegistration && (
            <Menu.Item>
              <Link aria-label="register" to="/register">
                <FormattedMessage id="Register" defaultMessage="Register" />
              </Link>
            </Menu.Item>
          )}
        </Menu>
      )
    );
  }


export default Anontools;



/**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
Anontools.propTypes = {
  token: PropTypes.string,
  content: PropTypes.shape({
    '@id': PropTypes.string,
  }),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Anontools.defaultProps = {
  token: null,
  content: {
    '@id': null,
  },
};
