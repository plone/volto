/**
 * Root reducer.
 * @module reducers/root
 */

import actions from '@plone/volto/reducers/actions/actions';
import addons from '@plone/volto/reducers/addons/addons';
import apierror from '@plone/volto/reducers/apierror/apierror';
import breadcrumbs from '@plone/volto/reducers/breadcrumbs/breadcrumbs';
import browserdetect from '@plone/volto/reducers/browserdetect/browserdetect';
import clipboard from '@plone/volto/reducers/clipboard/clipboard';
import comments from '@plone/volto/reducers/comments/comments';
import content from '@plone/volto/reducers/content/content';
import controlpanels from '@plone/volto/reducers/controlpanels/controlpanels';
import diff from '@plone/volto/reducers/diff/diff';
import emailNotification from '@plone/volto/reducers/emailNotification/emailNotification';
import fieldSchema from '@plone/volto/reducers/fieldschema/fieldschema';
import form from '@plone/volto/reducers/form/form';
import groups from '@plone/volto/reducers/groups/groups';
import history from '@plone/volto/reducers/history/history';
import messages from '@plone/volto/reducers/messages/messages';
import navigation from '@plone/volto/reducers/navigation/navigation';
import querystring from '@plone/volto/reducers/querystring/querystring';
import querystringsearch from '@plone/volto/reducers/querystringsearch/querystringsearch';
import roles from '@plone/volto/reducers/roles/roles';
import schema from '@plone/volto/reducers/schema/schema';
import search from '@plone/volto/reducers/search/search';
import sharing from '@plone/volto/reducers/sharing/sharing';
import sidebar from '@plone/volto/reducers/sidebar/sidebar';
import toolbar from '@plone/volto/reducers/toolbar/toolbar';
import types from '@plone/volto/reducers/types/types';
import users from '@plone/volto/reducers/users/users';
import userSession from '@plone/volto/reducers/userSession/userSession';
import vocabularies from '@plone/volto/reducers/vocabularies/vocabularies';
import workflow from '@plone/volto/reducers/workflow/workflow';
import { intlReducer } from 'react-intl-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { addonReducers } from '~/config';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  intl: intlReducer,
  reduxAsyncConnect,
  actions,
  addons,
  apierror,
  breadcrumbs,
  browserdetect,
  comments,
  content,
  controlpanels,
  clipboard,
  diff,
  emailNotification,
  form,
  groups,
  history,
  messages,
  navigation,
  querystring,
  querystringsearch,
  roles,
  schema,
  search,
  sharing,
  sidebar,
  types,
  users,
  userSession,
  vocabularies,
  workflow,
  toolbar,
  fieldSchema,
  ...addonReducers,
};

export default reducers;
