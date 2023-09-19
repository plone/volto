/**
 * Root reducer.
 * @module reducers/root
 */

import { intlReducer } from 'react-intl-redux';

import actions from '@plone/volto/reducers/actions/actions';
import addons from '@plone/volto/reducers/addons/addons';
import apierror from '@plone/volto/reducers/apierror/apierror';
import aliases from '@plone/volto/reducers/aliases/aliases';
import breadcrumbs from '@plone/volto/reducers/breadcrumbs/breadcrumbs';
import browserdetect from '@plone/volto/reducers/browserdetect/browserdetect';
import comments from '@plone/volto/reducers/comments/comments';
import content from '@plone/volto/reducers/content/content';
import controlpanels from '@plone/volto/reducers/controlpanels/controlpanels';
import clipboard from '@plone/volto/reducers/clipboard/clipboard';
import diff from '@plone/volto/reducers/diff/diff';
import emailNotification from '@plone/volto/reducers/emailNotification/emailNotification';
import emailSend from '@plone/volto/reducers/emailSend/emailSend';
import form from '@plone/volto/reducers/form/form';
import history from '@plone/volto/reducers/history/history';
import groups from '@plone/volto/reducers/groups/groups';
import messages from '@plone/volto/reducers/messages/messages';
import navigation from '@plone/volto/reducers/navigation/navigation';
import querystring from '@plone/volto/reducers/querystring/querystring';
import querystringsearch from '@plone/volto/reducers/querystringsearch/querystringsearch';
import relations from '@plone/volto/reducers/relations/relations';
import roles from '@plone/volto/reducers/roles/roles';
import rules from '@plone/volto/reducers/rules/rules';
import controlpanelrule from '@plone/volto/reducers/controlPanelRule/controlPanelRule';
import controlpanelrules from '@plone/volto/reducers/controlPanelRules/controlPanelRules';
import contentrulesevents from '@plone/volto/reducers/contentRulesEvents/contentRulesEvents';
import schema from '@plone/volto/reducers/schema/schema';
import search from '@plone/volto/reducers/search/search';
import sharing from '@plone/volto/reducers/sharing/sharing';
import sidebar from '@plone/volto/reducers/sidebar/sidebar';
import types from '@plone/volto/reducers/types/types';
import users from '@plone/volto/reducers/users/users';
import authRole from '@plone/volto/reducers/authRole/authRole';
import userSession from '@plone/volto/reducers/userSession/userSession';
import vocabularies from '@plone/volto/reducers/vocabularies/vocabularies';
import workflow from '@plone/volto/reducers/workflow/workflow';
import toolbar from '@plone/volto/reducers/toolbar/toolbar';
import blocksClipboard from '@plone/volto/reducers/blocksClipboard/blocksClipboard';
import lazyLibraries from '@plone/volto/reducers/lazyLibraries/lazyLibraries';
import contextNavigation from '@plone/volto/reducers/contextNavigation/contextNavigation';
import reduxAsyncConnect from './asyncConnect/asyncConnect';
import workingCopy from './workingcopy/workingcopy';
import transactions from './transactions/transactions';
import upgrade from './upgrade/upgrade';
import userschema from './userschema/userschema';
import site from './site/site';
import navroot from './navroot/navroot';

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
  aliases,
  breadcrumbs,
  browserdetect,
  comments,
  content,
  controlpanels,
  clipboard,
  diff,
  emailNotification,
  emailSend,
  form,
  groups,
  history,
  messages,
  navigation,
  querystring,
  querystringsearch,
  relations,
  roles,
  rules,
  controlpanelrule,
  controlpanelrules,
  contentrulesevents,
  schema,
  search,
  sharing,
  sidebar,
  types,
  users,
  authRole,
  userSession,
  vocabularies,
  workflow,
  toolbar,
  blocksClipboard,
  lazyLibraries,
  contextNavigation,
  upgrade,
  workingCopy,
  transactions,
  userschema,
  site,
  navroot,
};

export default reducers;
