/**
 * Root reducer.
 * @module reducers/root
 */

import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

import page from 'reducers/page';
import login from 'reducers/login';
import navigation from 'reducers/navigation';

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
  page,
  login,
  navigation,
});
