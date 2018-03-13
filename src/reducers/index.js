/**
 * Root reducer.
 * @module reducers/root
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { intlReducer } from 'react-intl-redux';

import actions from './actions/actions';
import breadcrumbs from './breadcrumbs/breadcrumbs';
import comments from './comments/comments';
import content from './content/content';
import controlpanel from './controlpanel/controlpanel';
import controlpanels from './controlpanels/controlpanels';
import clipboard from './clipboard/clipboard';
import diff from './diff/diff';
import emailNotification from './emailNotification/emailNotification';
import form from './form/form';
import history from './history/history';
import messages from './messages/messages';
import navigation from './navigation/navigation';
import schema from './schema/schema';
import search from './search/search';
import sharing from './sharing/sharing';
import tiles from './tiles/tiles';
import types from './types/types';
import users from './users/users';
import userSession from './userSession/userSession';
import vocabularies from './vocabularies/vocabularies';
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
  actions,
  breadcrumbs,
  comments,
  content,
  controlpanel,
  controlpanels,
  clipboard,
  diff,
  emailNotification,
  form,
  history,
  messages,
  navigation,
  schema,
  search,
  sharing,
  tiles,
  types,
  users,
  userSession,
  vocabularies,
  workflow,
});
