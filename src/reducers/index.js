/**
 * Root reducer.
 * @module reducers/root
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { intlReducer } from 'react-intl-redux';

import breadcrumbs from './breadcrumbs/breadcrumbs';
import content from './content/content';
import clipboard from './clipboard/clipboard';
import diff from './diff/diff';
import form from './form/form';
import history from './history/history';
import navigation from './navigation/navigation';
import schema from './schema/schema';
import search from './search/search';
import sharing from './sharing/sharing';
import types from './types/types';
import userSession from './userSession/userSession';
import workflow from './workflow/workflow';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default combineReducers({
  routing: routerReducer,
  intl: intlReducer,
  reduxAsyncConnect,
  breadcrumbs,
  content,
  clipboard,
  diff,
  form,
  history,
  navigation,
  schema,
  search,
  sharing,
  types,
  userSession,
  workflow,
});
