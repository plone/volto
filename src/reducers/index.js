/**
 * Root reducer.
 * @module reducers/root
 */

import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

import breadcrumbs from 'reducers/breadcrumbs';
import content from 'reducers/content';
import navigation from 'reducers/navigation';
import schema from 'reducers/schema';
import search from 'reducers/search';
import userSession from 'reducers/userSession';
import workflow from 'reducers/workflow';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  breadcrumbs,
  content,
  navigation,
  schema,
  search,
  userSession,
  workflow,
});
