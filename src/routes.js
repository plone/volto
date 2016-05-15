/**
 * Routes.
 * @module routes
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App, Edit, View, NotFound, Layout } from 'containers';

/**
 * Routes function.
 * @function
 * @returns {Object} Routes.
 */
export default () => (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={View} />
      <Route path="/**/edit" component={Edit} />
      <Route path="/**/layout" component={Layout} />
      <Route path="/**" component={View} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  </Route>
);
