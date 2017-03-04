/**
 * Routes.
 * @module routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Add, App, Edit, View, NotFound, Layout, Login, Logout } from './containers';

/**
 * Routes function.
 * @function
 * @returns {Object} Routes.
 */
export default () => (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={View} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/**/add" component={Add} />
      <Route path="/**/edit" component={Edit} />
      <Route path="/**/layout" component={Layout} />
      <Route path="/**" component={View} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  </Route>
);
