/**
 * Routes.
 * @module routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import isMobile from 'ismobilejs';

import {
  Add,
  App,
  Contents,
  Edit,
  Delete,
  View,
  NotFound,
  Layout,
  Login,
  Logout,
  Search,
  Sharing,
} from './components';

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
  >
    <IndexRoute component={View} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/search" component={Search} />
    <Route path="/**/add" component={Add} />
    <Route path="/**/contents" component={Contents} />
    <Route path="/**/delete" component={Delete} />
    <Route path="/**/edit" component={Edit} />
    <Route path="/**/layout" component={Layout} />
    <Route path="/**/sharing" component={Sharing} />
    <Route path="/**" component={View} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
