/**
 * Routes.
 * @module routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Add, App, Edit, Delete, View, NotFound, Layout, Login, Logout, Search } from './components';

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
      <Route path="/search" component={Search} />
      <Route path="/**/add" component={Add} />
      <Route path="/**/delete" component={Delete} />
      <Route path="/**/edit" component={Edit} />
      <Route path="/**/layout" component={Layout} />
      <Route path="/**" component={View} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  </Route>
);
