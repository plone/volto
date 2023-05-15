/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';

/**
 * Header function.
 * @function Header
 * @
 * @returns {string} Markup of the component.

 */
const Header = ({ pathname }) => {
  const { token } = useSelector(
    (state) => ({
      token: state.userSession.token,
    }),
    shallowEqual,
  );

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  return (
    <Segment basic className="header-wrapper" role="banner">
      <Container>
        <div className="header">
          <div className="logo-nav-wrapper">
            <div className="logo">
              <Logo />
            </div>
            <Navigation pathname={pathname} />
          </div>
          <div className="tools-search-wrapper">
            <LanguageSelector />
            {!token && (
              <div className="tools">
                <Anontools />
              </div>
            )}
            <div className="search">
              <SearchWidget />
            </div>
          </div>
        </div>
      </Container>
    </Segment>
  );
};

export default Header;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

Header.propTypes = {
  token: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.any),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Header.defaultProps = {
  token: null,
  content: null,
};
