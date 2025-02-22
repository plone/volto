import {
  loginMutation as _loginMutation,
  login as _login,
} from './restapi/login/post';
import type { LoginArgs } from './restapi/login/post';

import {
  getContent as _getContent,
  getContentQuery as _getContentQuery,
} from './restapi/content/get';
import { createContentMutation as _createContentMutation } from './restapi/content/add';
import { updateContentMutation as _updateContentMutation } from './restapi/content/update';
import { deleteContentMutation as _deleteContentMutation } from './restapi/content/delete';
import { getBreadcrumbsQuery as _getBreadcrumbsQuery } from './restapi/breadcrumbs/get';
import { getNavigationQuery as _getNavigationQuery } from './restapi/navigation/get';
import { getContextNavigationQuery as _getContextNavigationQuery } from './restapi/contextnavigation/get';
import { getActionsQuery as _getActionsQuery } from './restapi/actions/get';
import { getAliasesQuery as _getAliasesQuery } from './restapi/aliases/get';
import { createAliasesMutation as _createAliasesMutation } from './restapi/aliases/add';
import { deleteAliasesMutation as _deleteAliasesMutation } from './restapi/aliases/delete';
import { getAddonsQuery as _getAddonsQuery } from './restapi/addons/get_list';
import { getAddonQuery as _getAddonQuery } from './restapi/addons/get';
import { installAddonMutation as _installAddonMutation } from './restapi/addons/install';
import { installAddonProfileMutation as _installAddonProfileMutation } from './restapi/addons/install_profile';
import { uninstallAddonMutation as _uninstallAddonMutation } from './restapi/addons/unistall';
import { upgradeAddonMutation as _upgradeAddonMutation } from './restapi/addons/upgrade';
import { getDatabaseQuery as _getDatabaseQuery } from './restapi/database/get';
import { getGroupQuery as _getGroupQuery } from './restapi/groups/get';
import { createGroupMutation as _createGroupMutation } from './restapi/groups/add';
import { getGroupsQuery as _getGroupsQuery } from './restapi/groups/get_list';
import { updateGroupMutation as _updateGroupMutation } from './restapi/groups/update';
import { deleteGroupMutation as _deleteGroupMutation } from './restapi/groups/delete';
import { getHistoryQuery as _getHistoryQuery } from './restapi/history/get';
import { getHistoryVersionedQuery as _getHistoryVersionedQuery } from './restapi/history/get_versioned';
import { revertHistoryMutation as _revertHistoryMutation } from './restapi/history/revert';
import { getUsersQuery as _getUsersQuery } from './restapi/users/get_list';
import { getUserQuery as _getUserQuery } from './restapi/users/get';
import { createUserMutation as _createUserMutation } from './restapi/users/add';
import { deleteUserMutation as _deleteUserMutation } from './restapi/users/delete';
import { resetPasswordMutation as _resetPasswordMutation } from './restapi/users/reset_password';
import { resetPasswordWithTokenMutation as _resetPasswordWithTokenMutation } from './restapi/users/reset_password_with_token';
import { updatePasswordMutation as _updatePasswordMutation } from './restapi/users/update_password';
import { updateUserMutation as _updateUserMutation } from './restapi/users/update';
import { getRelationsListQuery as _getRelationsListQuery } from './restapi/relations/get_list';
import { getRelationsQuery as _getRelationsQuery } from './restapi/relations/get';
import { createRelationsMutation as _createRelationsMutation } from './restapi/relations/add';
import { deleteRelationsMutation as _deleteRelationsMutation } from './restapi/relations/delete';
import { fixRelationsMutation as _fixRelationsMutation } from './restapi/relations/fix';
import { getQuerystringSearchQuery as _getQuerystringSearchQuery } from './restapi/querystring-search/get';
import { postQuerystringSearchMutation as _postQuerystringSearchMutation } from './restapi/querystring-search/post';
import { getRulesQuery as _getRulesQuery } from './restapi/rules/get';
import { createRuleMutation as _createRuleMutation } from './restapi/rules/add';
import { updateRulesMutation as _updateRulesMutation } from './restapi/rules/update';
import { deleteRulesMutation as _deleteRulesMutation } from './restapi/rules/delete';
import { getControlpanelsQuery as _getControlpanelsQuery } from './restapi/controlpanels/get_list';
import { getControlpanelQuery as _getControlpanelQuery } from './restapi/controlpanels/get';
import { createControlpanelMutation as _createControlpanelMutation } from './restapi/controlpanels/add';
import { updateControlpanelMutation as _updateControlpanelMutation } from './restapi/controlpanels/update';
import { deleteControlpanelMutation as _deleteControlpanelMutation } from './restapi/controlpanels/delete';
import { getSearchQuery as _getSearchQuery } from './restapi/search/get';
import { getQuerysourceQuery as _getQuerysourceQuery } from './restapi/querysources/get';
import { getSourceQuery as _getSourceQuery } from './restapi/sources/get';
import { getUserschemaQuery as _getUserschemaQuery } from './restapi/userschema/get';
import { getRolesQuery as _getRolesQuery } from './restapi/roles/get';
import { getSystemQuery as _getSystemQuery } from './restapi/system/get';
import { getTransactionsQuery as _getTransactionsQuery } from './restapi/transactions/get';
import { revertTransactionsMutation as _revertTransactionsMutation } from './restapi/transactions/revert';
import { getUpgradeQuery as _getUpgradeQuery } from './restapi/upgrade/get';
import { runUpgradeMutation as _runUpgradeMutation } from './restapi/upgrade/run';
import { getLinkintegrityQuery as _getLinkintegrityQuery } from './restapi/linkintegrity/get';
import { getPrincipalsQuery as _getPrincipalsQuery } from './restapi/principals/get';
import { getWorkingcopyQuery as _getWorkingcopyQuery } from './restapi/workingcopy/get';
import { createWorkingcopyMutation as _createWorkingcopyMutation } from './restapi/workingcopy/add';
import { checkInWorkingcopyMutation as _checkInWorkingcopyMutation } from './restapi/workingcopy/check-in';
import { deleteWorkingcopyMutation as _deleteWorkingcopyMutation } from './restapi/workingcopy/delete';
import { copyMutation as _copyMutation } from './restapi/copymove/copy';
import { moveMutation as _moveMutation } from './restapi/copymove/move';
import { getSiteQuery as _getSiteQuery } from './restapi/site/get';
import { getRegistriesQuery as _getRegistriesQuery } from './restapi/registry/get_list';
import { getRegistryQuery as _getRegistryQuery } from './restapi/registry/get';
import { updateRegistryMutation as _updateRegistryMutation } from './restapi/registry/update';
import { getLockQuery as _getLockQuery } from './restapi/lock/get';
import { createLockMutation as _createLockMutation } from './restapi/lock/add';
import { updateLockMutation as _updateLockMutation } from './restapi/lock/update';
import { deleteLockMutation as _deleteLockMutation } from './restapi/lock/delete';
import { getWorkflowQuery as _getWorkflowQuery } from './restapi/workflow/get';
import { createWorkflowMutation as _createWorkflowMutation } from './restapi/workflow/add';
import { getVocabulariesListQuery as _getVocabulariesListQuery } from './restapi/vocabularies/get_list';
import { getVocabulariesQuery as _getVocabulariesQuery } from './restapi/vocabularies/get';
import { getQueryStringQuery as _getQueryStringQuery } from './restapi/querystring/get';
import { getNavrootQuery as _getNavrootQuery } from './restapi/navroot/get';
import { getTypesQuery as _getTypesQuery } from './restapi/types/get_list';
import { getTypeQuery as _getTypeQuery } from './restapi/types/get';
import { getTypeFieldQuery as _getTypeFieldQuery } from './restapi/types/get_type_field';
import { createTypeFieldMutation as _createTypeFieldMutation } from './restapi/types/add';
import { updateTypeFieldMutation as _updateTypeFieldMutation } from './restapi/types/update';
import { getAliasesListQuery as _getAliasesListQuery } from './restapi/aliases/get_list';
import { createAliasesMultipleMutation as _createAliasesMultipleMutation } from './restapi/aliases/add_multiple';
import { getCommentsQuery as _getCommentsQuery } from './restapi/comments/get';
import { createCommentMutation as _createCommentMutation } from './restapi/comments/add';
import { updateCommentMutation as _updateCommentMutation } from './restapi/comments/update';
import { deleteCommentMutation as _deleteCommentMutation } from './restapi/comments/delete';
import { emailNotificationMutation as _emailNotificationMutation } from './restapi/email-notification/post';
import { emailSendMutation as _emailSendMutation } from './restapi/email-send/post';
import { getTranslationQuery as _getTranslationQuery } from './restapi/translations/get';
import { linkTranslationMutation as _linkTranslationMutation } from './restapi/translations/link';
import { unlinkTranslationMutation as _unlinkTranslationMutation } from './restapi/translations/unlink';

import {
  queryHookFromQuery,
  mutationWithConfig,
  queryWithConfig,
  mutationHookFromMutation,
} from './utils/misc';
import type { PloneClientConfig } from './validation/config';

const PLONECLIENT_DEFAULT_CONFIG = { apiPath: 'http://localhost:8080/Plone' };

export default class PloneClient {
  public config: PloneClientConfig = PLONECLIENT_DEFAULT_CONFIG;

  static initialize = (
    config: PloneClientConfig,
  ): InstanceType<typeof PloneClient> =>
    new PloneClient({ ...PLONECLIENT_DEFAULT_CONFIG, ...config });

  constructor(config: PloneClientConfig) {
    this.config = config;
  }

  login = async (loginArgs: Omit<LoginArgs, 'config'>) => {
    const { token } = await _login({ ...loginArgs, config: this.config });
    this.config.token = token;
    return token;
  };

  getConfig = () => {
    return this.config;
  };
  /*
    Conventionally, get<Entity>Query naming scheme should be used for
    objects that are supposed to be used with `useQuery` by the user.

    Similarily, create<Entity>Mutation naming scheme would be used for
    objects that are supposed to be used with `useMutation` by the user.
  */

  /*
    Initialization queries
  */
  loginMutation = mutationWithConfig(_loginMutation, this.getConfig);

  /*
    Content queries
  */
  getContent = queryWithConfig(_getContent, this.getConfig);
  getContentQuery = queryWithConfig(_getContentQuery, this.getConfig);
  createContentMutation = mutationWithConfig(
    _createContentMutation,
    this.getConfig,
  );
  updateContentMutation = mutationWithConfig(
    _updateContentMutation,
    this.getConfig,
  );
  deleteContentMutation = mutationWithConfig(
    _deleteContentMutation,
    this.getConfig,
  );

  /*
    Breadcrumbs queries
  */
  getBreadcrumbsQuery = queryWithConfig(_getBreadcrumbsQuery, this.getConfig);

  /*
    Navigation queries
  */
  getNavigationQuery = queryWithConfig(_getNavigationQuery, this.getConfig);

  /*
    ContextNavigation queries
  */
  getContextNavigationQuery = queryWithConfig(
    _getContextNavigationQuery,
    this.getConfig,
  );

  /*
    Actions queries
  */
  getActionsQuery = queryWithConfig(_getActionsQuery, this.getConfig);

  /*
    Aliases queries
  */
  getAliasesQuery = queryWithConfig(_getAliasesQuery, this.getConfig);
  createAliasesMutation = mutationWithConfig(
    _createAliasesMutation,
    this.getConfig,
  );
  deleteAliasesMutation = mutationWithConfig(
    _deleteAliasesMutation,
    this.getConfig,
  );
  getAliasesListQuery = queryWithConfig(_getAliasesListQuery, this.getConfig);
  createAliasesMultipleMutation = mutationWithConfig(
    _createAliasesMultipleMutation,
    this.getConfig,
  );

  /*
    Addons queries
  */
  getAddonsQuery = queryWithConfig(_getAddonsQuery, this.getConfig);
  getAddonQuery = queryWithConfig(_getAddonQuery, this.getConfig);
  installAddonMutation = mutationWithConfig(
    _installAddonMutation,
    this.getConfig,
  );
  installProfileAddonMutation = mutationWithConfig(
    _installAddonProfileMutation,
    this.getConfig,
  );
  uninstallAddonMutation = mutationWithConfig(
    _uninstallAddonMutation,
    this.getConfig,
  );
  upgradeAddonMutation = mutationWithConfig(
    _upgradeAddonMutation,
    this.getConfig,
  );

  /*
    Database queries
  */

  getDatabaseQuery = queryWithConfig(_getDatabaseQuery, this.getConfig);
  /*
    Group queries
  */
  getGroupsQuery = queryWithConfig(_getGroupsQuery, this.getConfig);
  getGroupQuery = queryWithConfig(_getGroupQuery, this.getConfig);
  createGroupMutation = mutationWithConfig(
    _createGroupMutation,
    this.getConfig,
  );
  updateGroupMutation = mutationWithConfig(
    _updateGroupMutation,
    this.getConfig,
  );
  deleteGroupMutation = mutationWithConfig(
    _deleteGroupMutation,
    this.getConfig,
  );

  /*
    History queries
  */
  getHistoryQuery = queryWithConfig(_getHistoryQuery, this.getConfig);
  getHistoryVersionedQuery = queryWithConfig(
    _getHistoryVersionedQuery,
    this.getConfig,
  );
  revertHistoryMutation = mutationWithConfig(
    _revertHistoryMutation,
    this.getConfig,
  );

  /*
    User queries
  */
  getUsersQuery = queryWithConfig(_getUsersQuery, this.getConfig);
  getUserQuery = queryWithConfig(_getUserQuery, this.getConfig);
  createUserMutation = mutationWithConfig(_createUserMutation, this.getConfig);
  deleteUserMutation = mutationWithConfig(_deleteUserMutation, this.getConfig);
  resetPasswordMutation = mutationWithConfig(
    _resetPasswordMutation,
    this.getConfig,
  );
  resetPasswordWithTokenMutation = mutationWithConfig(
    _resetPasswordWithTokenMutation,
    this.getConfig,
  );
  updatePasswordMutation = mutationWithConfig(
    _updatePasswordMutation,
    this.getConfig,
  );
  updateUserMutation = mutationWithConfig(_updateUserMutation, this.getConfig);

  /*
    Relations queries
 */
  getRelationsListQuery = queryWithConfig(
    _getRelationsListQuery,
    this.getConfig,
  );
  getRelationsQuery = queryWithConfig(_getRelationsQuery, this.getConfig);
  createRelationsMutation = mutationWithConfig(
    _createRelationsMutation,
    this.getConfig,
  );
  deleteRelationsMutation = mutationWithConfig(
    _deleteRelationsMutation,
    this.getConfig,
  );
  fixRelationsMutation = mutationWithConfig(
    _fixRelationsMutation,
    this.getConfig,
  );

  /*
    UserSchema queries
  */
  getUserschemaQuery = queryWithConfig(_getUserschemaQuery, this.getConfig);

  /*
    Roles queries
  */
  getRolesQuery = queryWithConfig(_getRolesQuery, this.getConfig);

  /*
    System queries
  */
  getSystemQuery = queryWithConfig(_getSystemQuery, this.getConfig);

  /*
    Transactions queries
  */
  getTransactionsQuery = queryWithConfig(_getTransactionsQuery, this.getConfig);
  revertTransactionsMutation = mutationWithConfig(
    _revertTransactionsMutation,
    this.getConfig,
  );

  /*
    Principals queries
  */
  getPrincipalsQuery = queryWithConfig(_getPrincipalsQuery, this.getConfig);

  /*
    Workingcopy queries
  */
  getWorkingcopyQuery = queryWithConfig(_getWorkingcopyQuery, this.getConfig);
  createWorkingcopyMutation = mutationWithConfig(
    _createWorkingcopyMutation,
    this.getConfig,
  );
  checkInWorkingcopyMutation = mutationWithConfig(
    _checkInWorkingcopyMutation,
    this.getConfig,
  );
  deleteWorkingcopyMutation = mutationWithConfig(
    _deleteWorkingcopyMutation,
    this.getConfig,
  );

  /*
    Querystring search queries
  */
  getQuerystringSearchQuery = queryWithConfig(
    _getQuerystringSearchQuery,
    this.getConfig,
  );
  postQuerystringSearchMutation = mutationWithConfig(
    _postQuerystringSearchMutation,
    this.getConfig,
  );

  /*
    Rules queries
  */
  getRulesQuery = queryWithConfig(_getRulesQuery, this.getConfig);
  createRuleMutation = mutationWithConfig(_createRuleMutation, this.getConfig);
  updateRulesMutation = mutationWithConfig(
    _updateRulesMutation,
    this.getConfig,
  );
  deleteRulesMutation = mutationWithConfig(
    _deleteRulesMutation,
    this.getConfig,
  );

  /*
    Controlpanels queries
  */
  getControlpanelsQuery = queryWithConfig(
    _getControlpanelsQuery,
    this.getConfig,
  );
  getControlpanelQuery = queryWithConfig(_getControlpanelQuery, this.getConfig);
  createControlpanelMutation = mutationWithConfig(
    _createControlpanelMutation,
    this.getConfig,
  );
  updateControlpanelMutation = mutationWithConfig(
    _updateControlpanelMutation,
    this.getConfig,
  );
  deleteControlpanelMutation = mutationWithConfig(
    _deleteControlpanelMutation,
    this.getConfig,
  );

  /*
    Search queries
  */
  getSearchQuery = queryWithConfig(_getSearchQuery, this.getConfig);

  /*
    Querysources queries
  */
  getQuerysourceQuery = queryWithConfig(_getQuerysourceQuery, this.getConfig);

  /*
    Sources queries
  */
  getSourceQuery = queryWithConfig(_getSourceQuery, this.getConfig);

  /*
    Copy and Move queries
  */
  copyMutation = mutationWithConfig(_copyMutation, this.getConfig);
  moveMutation = mutationWithConfig(_moveMutation, this.getConfig);

  /*
    Site queries
  */
  getSiteQuery = queryWithConfig(_getSiteQuery, this.getConfig);

  /*
    Registries queries
  */
  getRegistriesQuery = queryWithConfig(_getRegistriesQuery, this.getConfig);
  getRegistryQuery = queryWithConfig(_getRegistryQuery, this.getConfig);
  updateRegistryMutation = mutationWithConfig(
    _updateRegistryMutation,
    this.getConfig,
  );

  /*
    Upgrade queries
  */
  getUpgradeQuery = queryWithConfig(_getUpgradeQuery, this.getConfig);
  runUpgradeMutation = mutationWithConfig(_runUpgradeMutation, this.getConfig);

  /*
    Linkintegrity queries
  */
  getLinkintegrityQuery = queryWithConfig(
    _getLinkintegrityQuery,
    this.getConfig,
  );

  /*
    Lock queries
  */
  getLockQuery = queryWithConfig(_getLockQuery, this.getConfig);
  createLockMutation = mutationWithConfig(_createLockMutation, this.getConfig);
  updateLockMutation = mutationWithConfig(_updateLockMutation, this.getConfig);
  deleteLockMutation = mutationWithConfig(_deleteLockMutation, this.getConfig);

  /*
    Workflow queries
  */
  getWorkflowQuery = queryWithConfig(_getWorkflowQuery, this.getConfig);
  createWorkflowMutation = mutationWithConfig(
    _createWorkflowMutation,
    this.getConfig,
  );

  /*
    Vocabularies queries
  */
  getVocabulariesListQuery = queryWithConfig(
    _getVocabulariesListQuery,
    this.getConfig,
  );
  getVocabulariesQuery = queryWithConfig(_getVocabulariesQuery, this.getConfig);

  /*
    Querystring queries
  */
  getQueryStringQuery = queryWithConfig(_getQueryStringQuery, this.getConfig);

  /*
    Navroot queries
  */
  getNavrootQuery = queryWithConfig(_getNavrootQuery, this.getConfig);

  /*
    Type queries
  */
  getTypesQuery = queryWithConfig(_getTypesQuery, this.getConfig);
  getTypeQuery = queryWithConfig(_getTypeQuery, this.getConfig);
  getTypeFieldQuery = queryWithConfig(_getTypeFieldQuery, this.getConfig);
  createTypeFieldMutation = mutationWithConfig(
    _createTypeFieldMutation,
    this.getConfig,
  );
  updateTypeFieldMutation = mutationWithConfig(
    _updateTypeFieldMutation,
    this.getConfig,
  );

  /*
    Comments queries
  */
  getCommentsQuery = queryWithConfig(_getCommentsQuery, this.getConfig);
  createCommentMutation = mutationWithConfig(
    _createCommentMutation,
    this.getConfig,
  );
  updateCommentMutation = mutationWithConfig(
    _updateCommentMutation,
    this.getConfig,
  );
  deleteCommentMutation = mutationWithConfig(
    _deleteCommentMutation,
    this.getConfig,
  );

  /*
    Email notifcation queries
  */
  emailNotificationMutation = mutationWithConfig(
    _emailNotificationMutation,
    this.getConfig,
  );

  /*
    Email send queries
  */
  emailSendMutation = mutationWithConfig(_emailSendMutation, this.getConfig);

  /*
    Translation queries
  */
  getTranslationQuery = queryWithConfig(_getTranslationQuery, this.getConfig);
  linkTranslationMutation = mutationWithConfig(
    _linkTranslationMutation,
    this.getConfig,
  );
  unlinkTranslationMutation = mutationWithConfig(
    _unlinkTranslationMutation,
    this.getConfig,
  );

  /*
    Initialization hooks
  */

  useLogin = mutationHookFromMutation(this.loginMutation);

  /*
    Actions hooks
  */

  /*
    Content hooks
  */
  useGetContent = queryHookFromQuery(this.getContentQuery);
  useCreateContent = mutationHookFromMutation(this.createContentMutation);
  useUpdateContent = mutationHookFromMutation(this.updateContentMutation);
  useDeleteContent = mutationHookFromMutation(this.deleteContentMutation);

  /*
    Breadcrumbs hooks
  */
  useGetBreadcrumbs = queryHookFromQuery(this.getBreadcrumbsQuery);

  /*
    Navigation hooks
  */
  useGetNavigation = queryHookFromQuery(this.getNavigationQuery);

  /*
    ContextNavigation hooks
  */
  useGetContextNavigation = queryHookFromQuery(this.getContextNavigationQuery);

  /*
    Actions hooks
  */
  useGetActions = queryHookFromQuery(this.getActionsQuery);

  /*
    Aliases hooks
  */
  useGetAliases = queryHookFromQuery(this.getAliasesQuery);
  useCreateAliases = mutationHookFromMutation(this.createAliasesMutation);
  useDeleteAliases = mutationHookFromMutation(this.deleteAliasesMutation);
  useGetAliasesList = queryHookFromQuery(this.getAliasesListQuery);
  useCreateAliasesMultiple = mutationHookFromMutation(
    this.createAliasesMultipleMutation,
  );

  /*
    Addons hooks
  */
  useGetAddons = queryHookFromQuery(this.getAddonsQuery);
  useGetAddon = queryHookFromQuery(this.getAddonQuery);
  useInstallAddon = mutationHookFromMutation(this.installAddonMutation);
  useInstallProfileAddon = mutationHookFromMutation(
    this.installProfileAddonMutation,
  );
  useUninstallAddon = mutationHookFromMutation(this.uninstallAddonMutation);
  useUpgradeAddon = mutationHookFromMutation(this.upgradeAddonMutation);

  /*
    Database hooks
  */
  useGetDatabase = queryHookFromQuery(this.getDatabaseQuery);

  /*
    Group hooks
  */
  useGetGroups = queryHookFromQuery(this.getGroupsQuery);
  useGetGroup = queryHookFromQuery(this.getGroupQuery);
  useCreateGroup = mutationHookFromMutation(this.createGroupMutation);
  useUpdateGroup = mutationHookFromMutation(this.updateGroupMutation);
  useDeleteGroup = mutationHookFromMutation(this.deleteGroupMutation);

  /*
    History hooks
  */
  useGetHistory = queryHookFromQuery(this.getHistoryQuery);
  useGetHistoryVersioned = queryHookFromQuery(this.getHistoryVersionedQuery);
  useRevertHistory = mutationHookFromMutation(this.revertHistoryMutation);

  /*
    User hooks
  */
  useGetUsers = queryHookFromQuery(this.getUsersQuery);
  useGetUser = queryHookFromQuery(this.getUserQuery);
  useCreateUser = mutationHookFromMutation(this.createUserMutation);
  useDeleteUser = mutationHookFromMutation(this.deleteUserMutation);
  useResetPassword = mutationHookFromMutation(this.resetPasswordMutation);
  useResetPasswordWithToken = mutationHookFromMutation(
    this.resetPasswordWithTokenMutation,
  );
  useUpdatePassword = mutationHookFromMutation(this.updatePasswordMutation);
  useUpdateUser = mutationHookFromMutation(this.updateUserMutation);

  /*
    Relations hooks
  */
  useGetRelationsList = queryHookFromQuery(this.getRelationsListQuery);
  useGetRelations = queryHookFromQuery(this.getRelationsQuery);
  useCreateRelations = mutationHookFromMutation(this.createRelationsMutation);
  useDeleteRelations = mutationHookFromMutation(this.deleteRelationsMutation);
  useFixRelations = mutationHookFromMutation(this.fixRelationsMutation);

  /*
    UserSchema hooks
  */
  useGetUserschema = queryHookFromQuery(this.getUserschemaQuery);

  /*
    Roles hooks
  */
  useGetRoles = queryHookFromQuery(this.getRolesQuery);

  /*
    System hooks
  */
  useGetSystem = queryHookFromQuery(this.getSystemQuery);

  /*
    Transactions hooks
  */
  useGetTransactions = queryHookFromQuery(this.getTransactionsQuery);
  useRevertTransactions = mutationHookFromMutation(
    this.revertTransactionsMutation,
  );

  /*
    Principals hooks
  */
  useGetPrincipals = queryHookFromQuery(this.getPrincipalsQuery);

  /*
    Workingcopy hooks
  */
  useGetWorkingcopy = queryHookFromQuery(this.getWorkingcopyQuery);
  useCreateWorkingcopy = mutationHookFromMutation(
    this.createWorkingcopyMutation,
  );
  useCheckInWorkingcopy = mutationHookFromMutation(
    this.checkInWorkingcopyMutation,
  );
  useDeleteWorkingcopy = mutationHookFromMutation(
    this.deleteWorkingcopyMutation,
  );

  /*
    Querystring search hooks
  */
  useGetQuerystringSearch = queryHookFromQuery(this.getQuerystringSearchQuery);
  usePostQuerystringSearch = mutationHookFromMutation(
    this.postQuerystringSearchMutation,
  );

  /*
    Rules hooks
  */
  useGetRules = queryHookFromQuery(this.getRulesQuery);
  useCreateRule = mutationHookFromMutation(this.createRuleMutation);
  useUpdateRules = mutationHookFromMutation(this.updateRulesMutation);
  useDeleteRules = mutationHookFromMutation(this.deleteRulesMutation);

  /*
    Controlpanels hooks
  */
  useGetControlpanels = queryHookFromQuery(this.getControlpanelsQuery);
  useGetControlpanel = queryHookFromQuery(this.getControlpanelQuery);
  useCreateControlpanel = mutationHookFromMutation(
    this.createControlpanelMutation,
  );
  useUpdateControlpanel = mutationHookFromMutation(
    this.updateControlpanelMutation,
  );
  useDeleteControlpanel = mutationHookFromMutation(
    this.deleteControlpanelMutation,
  );

  /*
    Search hooks
  */
  useGetSearch = queryHookFromQuery(this.getSearchQuery);

  /*
    Querysources hooks
  */
  useGetQuerysource = queryHookFromQuery(this.getQuerysourceQuery);

  /*
    Sources hooks
  */
  useGetSource = queryHookFromQuery(this.getSourceQuery);

  /*
    Copy and Move hooks
  */
  useCopy = mutationHookFromMutation(this.copyMutation);
  useMove = mutationHookFromMutation(this.moveMutation);

  /*
    Site hooks
  */
  useGetSite = queryHookFromQuery(this.getSiteQuery);

  /*
    Registries hooks
  */
  useGetRegistries = queryHookFromQuery(this.getRegistriesQuery);
  useGetRegistry = queryHookFromQuery(this.getRegistryQuery);
  useUpdateRegistry = mutationHookFromMutation(this.updateRegistryMutation);

  /*
    Upgrade hooks
  */
  useGetUpgrade = queryHookFromQuery(this.getUpgradeQuery);
  useRunUpgrade = mutationHookFromMutation(this.runUpgradeMutation);

  /*
    Linkintegrity hooks
  */
  useGetLinkintegrity = queryHookFromQuery(this.getLinkintegrityQuery);

  /*
    Lock hooks
  */
  useGetLock = queryHookFromQuery(this.getLockQuery);
  useCreateLock = mutationHookFromMutation(this.createLockMutation);
  useUpdateLock = mutationHookFromMutation(this.updateLockMutation);
  useDeleteLock = mutationHookFromMutation(this.deleteLockMutation);

  /*
    Workflow hooks
  */
  useGetWorkflow = queryHookFromQuery(this.getWorkflowQuery);
  useCreateWorkflow = mutationHookFromMutation(this.createWorkflowMutation);

  /*
    Vocabularies hooks
  */
  useGetVocabulariesList = queryHookFromQuery(this.getVocabulariesListQuery);
  useGetVocabularies = queryHookFromQuery(this.getVocabulariesQuery);

  /*
    Querystring hooks
  */
  useGetQueryString = queryHookFromQuery(this.getQueryStringQuery);

  /*
    Navroot hooks
  */
  useGetNavroot = queryHookFromQuery(this.getNavrootQuery);

  /*
    Type hooks
  */
  useGetTypes = queryHookFromQuery(this.getTypesQuery);
  useGetType = queryHookFromQuery(this.getTypeQuery);
  useGetTypeField = queryHookFromQuery(this.getTypeFieldQuery);
  useCreateTypeField = mutationHookFromMutation(this.createTypeFieldMutation);
  useUpdateTypeField = mutationHookFromMutation(this.updateTypeFieldMutation);

  /*
    Comments hooks
  */
  useGetComments = queryHookFromQuery(this.getCommentsQuery);
  useCreateComment = mutationHookFromMutation(this.createCommentMutation);
  useUpdateComment = mutationHookFromMutation(this.updateCommentMutation);
  useDeleteComment = mutationHookFromMutation(this.deleteCommentMutation);

  /*
    Email notifcation hooks
  */
  useEmailNotification = mutationHookFromMutation(
    this.emailNotificationMutation,
  );

  /*
    Email send hooks
  */
  useEmailSend = mutationHookFromMutation(this.emailSendMutation);

  /*
    Translation hooks
  */
  useGetTranslation = queryHookFromQuery(this.getTranslationQuery);
  useLinkTranslation = mutationHookFromMutation(this.linkTranslationMutation);
  useUnlinkTranslation = mutationHookFromMutation(
    this.unlinkTranslationMutation,
  );
}
