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
  ChangePassword,
  Contents,
  Controlpanel,
  Controlpanels,
  Edit,
  Diff,
  Delete,
  History,
  View,
  NotFound,
  Layout,
  Login,
  Logout,
  PersonalInformation,
  PersonalPreferences,
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
    <IndexRoute components={{ main: View }} />
    <Route path="/login" components={{ main: Login }} />
    <Route path="/logout" components={{ main: Logout }} />
    <Route path="/search" components={{ main: Search }} />
    <Route path="/change-password" components={{ main: ChangePassword }} />
    <Route path="/controlpanel" components={{ main: Controlpanels }} />
    <Route path="/controlpanel/:id" components={{ main: Controlpanel }} />
    <Route
      path="/personal-information"
      components={{ main: PersonalInformation }}
    />
    <Route
      path="/personal-preferences"
      components={{ main: PersonalPreferences }}
    />
    <Route path="/**/add" components={{ main: Add }} />
    <Route path="/**/contents" components={{ main: Contents }} />
    <Route path="/**/delete" components={{ main: Delete }} />
    <Route path="/**/diff" components={{ main: Diff }} />
    <Route path="/**/edit" components={{ main: Edit }} />
    <Route path="/**/history" components={{ main: History }} />
    <Route path="/**/layout" components={{ main: Layout }} />
    <Route path="/**/sharing" components={{ main: Sharing }} />
    <Route path="/**" components={{ main: View }} />
    <Route path="*" components={{ main: NotFound }} status={404} />
  </Route>
);
