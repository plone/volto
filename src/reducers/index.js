/**
 * Root reducer.
 * @module reducers/root
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import breadcrumbs from './breadcrumbs';
import content from './content';
import form from './form';
import navigation from './navigation';
import schema from './schema';
import search from './search';
import userSession from './userSession';
import workflow from './workflow';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  breadcrumbs,
  content,
  form,
  navigation,
  schema,
  search,
  userSession,
  workflow,
});
