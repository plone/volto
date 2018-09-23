/**
 * Routes.
 * @module routes
 */

import React from 'react';
import { Route } from 'react-router-dom';
import isMobile from 'ismobilejs';

import { App } from './components';

/**
 * Routes function.
 * @function
 * @returns {Object} Routes.
 */
export default () => (
  <Route
    path="/"
    component={App}
    onChange={(prevState, nextState) => {
      if (isMobile.any && nextState.location.action === 'PUSH') {
        setTimeout(() => window.scrollTo(0, 0), 0);
      }
    }}
  />
);
