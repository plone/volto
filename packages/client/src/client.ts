import * as restapi from './restapi';

import type { PloneClientConfig } from './validation/config';

const PLONECLIENT_DEFAULT_CONFIG = {
  apiPath: 'http://localhost:8080/Plone',
};

export default class PloneClient {
  public config: PloneClientConfig = PLONECLIENT_DEFAULT_CONFIG;

  static initialize = (
    config: PloneClientConfig,
  ): InstanceType<typeof PloneClient> =>
    new PloneClient({ ...PLONECLIENT_DEFAULT_CONFIG, ...config });

  constructor(config: PloneClientConfig) {
    this.config = config;

    Object.values(this).forEach((propertyValue) => {
      if (propertyValue instanceof Function) {
        propertyValue = propertyValue.bind(this);
      }
    });
  }

  getActions = restapi.getActions;

  getAddons = restapi.getAddons;
  getAddon = restapi.getAddon;
  installAddon = restapi.installAddon;
  uninstallAddon = restapi.uninstallAddon;
  upgradeAddon = restapi.upgradeAddon;
  installAddonProfile = restapi.installAddonProfile;

  getAllAliases = restapi.getAllAliases;
  getAliases = restapi.getAliases;
  createAlias = restapi.createAlias;
  createAliases = restapi.createAliases;
  deleteAliases = restapi.deleteAliases;

  getBreadcrumbs = restapi.getBreadcrumbs;

  getComments = restapi.getComments;
  createComment = restapi.createComment;
  updateComment = restapi.updateComment;
  deleteComment = restapi.deleteComment;

  getContent = restapi.getContent;
  createContent = restapi.createContent;
  updateContent = restapi.updateContent;
  deleteContent = restapi.deleteContent;
  copyContent = restapi.copyContent;
  moveContent = restapi.moveContent;

  getContextNavigation = restapi.getContextNavigation;

  getControlpanels = restapi.getControlpanels;
  getControlpanel = restapi.getControlpanel;
  createControlpanel = restapi.createControlpanel;
  updateControlpanel = restapi.updateControlpanel;
  deleteControlpanel = restapi.deleteControlpanel;

  getDatabase = restapi.getDatabase;

  emailNotification = restapi.emailNotification;

  emailSend = restapi.emailSend;

  getGroups = restapi.getGroups;
  getGroup = restapi.getGroup;
  createGroup = restapi.createGroup;
  updateGroup = restapi.updateGroup;
  deleteGroup = restapi.deleteGroup;

  getHistory = restapi.getHistory;
  getHistoryVersion = restapi.getHistoryVersion;
  revertHistory = restapi.revertHistory;

  getLinkintegrity = restapi.getLinkintegrity;

  getLock = restapi.getLock;
  createLock = restapi.createLock;
  updateLock = restapi.updateLock;
  deleteLock = restapi.deleteLock;

  login = restapi.login;

  getNavigation = restapi.getNavigation;

  getNavroot = restapi.getNavroot;

  getPrincipals = restapi.getPrincipals;

  getQuerysources = restapi.getQuerysources;

  getQuerystring = restapi.getQuerystring;

  querystringSearch = restapi.querystringSearch;

  getRegistry = restapi.getRegistry;
  getRegistryRecord = restapi.getRegistryRecord;
  updateRegistry = restapi.updateRegistry;

  getAllRelations = restapi.getAllRelations;
  getRelations = restapi.getRelations;
  createRelations = restapi.createRelations;
  fixRelations = restapi.fixRelations;
  deleteRelations = restapi.deleteRelations;

  getRoles = restapi.getRoles;

  getRules = restapi.getRules;
  createRule = restapi.createRule;
  updateRules = restapi.updateRules;
  deleteRules = restapi.deleteRules;

  search = restapi.search;

  getSite = restapi.getSite;

  getSource = restapi.getSource;

  getSystem = restapi.getSystem;

  getTransactions = restapi.getTransactions;
  revertTransactions = restapi.revertTransactions;

  getTranslation = restapi.getTranslation;
  linkTranslation = restapi.linkTranslation;
  unlinkTranslation = restapi.unlinkTranslation;

  getTypes = restapi.getTypes;
  getType = restapi.getType;
  getTypeField = restapi.getTypeField;
  createTypeField = restapi.createTypeField;
  updateTypeField = restapi.updateTypeField;

  getUpgrade = restapi.getUpgrade;
  runUpgrade = restapi.runUpgrade;

  getUsers = restapi.getUsers;
  getUser = restapi.getUser;
  createUser = restapi.createUser;
  updateUser = restapi.updateUser;
  deleteUser = restapi.deleteUser;
  resetPassword = restapi.resetPassword;
  resetPasswordWithToken = restapi.resetPasswordWithToken;
  updatePassword = restapi.updatePassword;

  getUserschema = restapi.getUserschema;

  getVocabularies = restapi.getVocabularies;
  getVocabulary = restapi.getVocabulary;

  getWorkflow = restapi.getWorkflow;
  createWorkflow = restapi.createWorkflow;

  getWorkingcopy = restapi.getWorkingcopy;
  createWorkingcopy = restapi.createWorkingcopy;
  checkInWorkingcopy = restapi.checkInWorkingcopy;
  deleteWorkingcopy = restapi.deleteWorkingcopy;
}
