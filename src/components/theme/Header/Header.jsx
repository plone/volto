/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';


const Header = ({pathname, token}) => {
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
  }
  
  Header.propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };
  
  Header.defaultProps = {
    token: null,
  };


export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
