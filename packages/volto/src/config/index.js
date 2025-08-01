import ConfigRegistry from '@plone/volto/registry';
import { parse as parseUrl } from 'url';
import { nonContentRoutes } from './NonContentRoutes';
import { nonContentRoutesPublic } from './NonContentRoutesPublic';
import { loadables } from './Loadables';
import { workflowMapping } from './Workflows';
import slots from './slots';

import { contentIcons } from './ContentIcons';
import { styleClassNameConverters, styleClassNameExtenders } from './Style';
import {
  controlPanelsIcons,
  filterControlPanels,
  filterControlPanelsSchema,
  unwantedControlPanelsFields,
} from './ControlPanels';

import applyAddonConfiguration, { addonsInfo } from 'load-volto-addons';

import { installDefaultComponents } from './Components';
import { installDefaultWidgets } from './Widgets';
import { installDefaultViews } from './Views';
import { installDefaultBlocks } from './Blocks';

import { getSiteAsyncPropExtender } from '@plone/volto/helpers/Site';
import { registerValidators } from './validation';

import languages from '@plone/volto/constants/Languages.cjs';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const apiPath =
  process.env.RAZZLE_API_PATH ||
  (__DEVELOPMENT__ ? `http://${host}:${port}` : '');

const getServerURL = (url) => {
  if (!url) return;
  const apiPathURL = parseUrl(url);
  return `${apiPathURL.protocol}//${apiPathURL.hostname}${
    apiPathURL.port ? `:${apiPathURL.port}` : ''
  }`;
};

// Sensible defaults for publicURL
// if RAZZLE_PUBLIC_URL is present, use it
// if in DEV, use the host/port combination by default
// if in PROD, assume it's RAZZLE_API_PATH server name (no /api or alikes) or fallback
// to DEV settings if RAZZLE_API_PATH is not present
const publicURL =
  process.env.RAZZLE_PUBLIC_URL ||
  (__DEVELOPMENT__
    ? `http://${host}:${port}`
    : getServerURL(process.env.RAZZLE_API_PATH) || `http://${host}:${port}`);

const serverConfig =
  typeof __SERVER__ !== 'undefined' && __SERVER__
    ? require('./server').default
    : {};

let config = {
  settings: {
    host,
    port,
    // The URL Volto is going to be served (see sensible defaults above)
    publicURL,
    okRoute: '/ok',
    apiPath,
    apiExpanders: [
      // Added here for documentation purposes, added at the end because it
      // depends on a value of this object.
      // Add the following expanders for only issuing a single request.
      // https://6.docs.plone.org/volto/configuration/settings-reference.html#term-apiExpanders
      // {
      //   match: '',
      //   GET_CONTENT: [
      //     'breadcrumbs',
      //     'navigation',
      //     'actions',
      //     'types',
      //     'navroot',
      //   ],
      // },
    ],
    // Internal proxy to bypass CORS *while developing*. NOT intended for production use.
    // In production is recommended you use a Seamless mode deployment using a web server in
    // front of both the frontend and the backend so you can bypass CORS safely.
    // https://6.docs.plone.org/volto/deploying/seamless-mode.html
    devProxyToApiPath:
      process.env.RAZZLE_DEV_PROXY_API_PATH ||
      process.env.RAZZLE_INTERNAL_API_PATH ||
      process.env.RAZZLE_API_PATH ||
      'http://localhost:8080/Plone', // Set it to '' for disabling the proxy
    // proxyRewriteTarget Set it for set a custom target for the proxy or override the internal VHM rewrite
    // proxyRewriteTarget: '/VirtualHostBase/http/localhost:8080/Plone/VirtualHostRoot/_vh_api'
    // proxyRewriteTarget: 'https://myvoltositeinproduction.com'
    proxyRewriteTarget: process.env.RAZZLE_PROXY_REWRITE_TARGET || undefined,
    // apiPath: process.env.RAZZLE_API_PATH || 'http://localhost:8000', // for Volto reference
    // apiPath: process.env.RAZZLE_API_PATH || 'http://localhost:8081/db/web', // for guillotina
    actions_raising_api_errors: ['GET_CONTENT', 'UPDATE_CONTENT'],
    internalApiPath: process.env.RAZZLE_INTERNAL_API_PATH || undefined,
    websockets: process.env.RAZZLE_WEBSOCKETS || false,
    // TODO: legacyTraverse to be removed when the use of the legacy traverse is deprecated.
    legacyTraverse: process.env.RAZZLE_LEGACY_TRAVERSE || false,
    cookieExpires: 15552000, //in seconds. Default is 6 month (15552000)
    nonContentRoutes,
    nonContentRoutesPublic,
    imageObjects: ['Image'],
    reservedIds: ['login', 'layout', 'plone', 'zip', 'properties'],
    downloadableObjects: ['File'], //list of content-types for which the direct download of the file will be carried out if the user is not authenticated
    viewableInBrowserObjects: [], //ex: ['File']. List of content-types for which the file will be displayed in browser if the user is not authenticated
    listingPreviewImageField: 'image', // deprecated from Volto 14 onwards
    openExternalLinkInNewTab: false,
    notSupportedBrowsers: ['ie'],
    defaultPageSize: 25,
    supportedLanguages: Object.keys(languages),
    navDepth: 1,
    expressMiddleware: serverConfig.expressMiddleware, // BBB
    defaultBlockType: 'slate',
    verticalFormTabs: false,
    useEmailAsLogin: false,
    persistentReducers: ['blocksClipboard'],
    initialReducersBlacklist: [], // reducers in this list won't be hydrated in windows.__data
    asyncPropsExtenders: [getSiteAsyncPropExtender], // per route asyncConnect customizers
    contentIcons: contentIcons,
    loadables,
    lazyBundles: {
      cms: [
        'prettierStandalone',
        'prettierParserHtml',
        'prismCore',
        'toastify',
        'reactSelect',
        'reactBeautifulDnd',
        // 'diffLib',
      ],
    },
    appExtras: [],
    maxResponseSize: 2000000000, // This is superagent default (200 mb)
    maxFileUploadSize: null,
    serverConfig,
    storeExtenders: [],
    showTags: true,
    showRelatedItems: true,
    controlpanels: [],
    controlPanelsIcons,
    filterControlPanels,
    filterControlPanelsSchema,
    unwantedControlPanelsFields,
    externalRoutes: [
      // URL to be considered as external
      // {
      //   match: {
      //     path: '/news',
      //     exact: false,
      //     strict: false,
      //   },
      //   url(payload) {
      //     return payload.location.pathname;
      //   },
      // },
    ],
    showSelfRegistration: false,
    contentMetadataTagsImageField: 'image',
    contentPropertiesSchemaEnhancer: null,
    maxUndoLevels: 200, // undo history size for the main form
    addonsInfo: addonsInfo,
    workflowMapping,
    errorHandlers: [], // callables for unhandled errors
    styleClassNameConverters,
    hashLinkSmoothScroll: false,
    styleClassNameExtenders,
    querystringSearchGet: false,
    blockSettingsTabFieldsetsInitialStateOpen: true,
    excludeLinksAndReferencesMenuItem: false,
    siteTitleFormat: {
      includeSiteTitle: false,
      titleAndSiteTitleSeparator: '-',
    },
  },
  experimental: {
    addBlockButton: {
      enabled: true,
    },
  },
  widgets: {},
  views: {},
  blocks: {},
  addonRoutes: [],
  addonReducers: {},
  components: {},
  slots: {},
  utilities: {},
};

// The apiExpanders depends on a config of the object, so it's done here
config.settings.apiExpanders = [
  ...config.settings.apiExpanders,
  {
    match: '',
    GET_CONTENT: ['breadcrumbs', 'actions', 'types', 'navroot', 'translations'],
    // Note: translations is removed in the API middleware if the site is not multilingual.
  },
  {
    match: '',
    GET_CONTENT: ['navigation'],
    querystring: (config) => ({
      'expand.navigation.depth': config.settings.navDepth,
    }),
  },
];

ConfigRegistry.settings = config.settings;
ConfigRegistry.experimental = config.experimental;
ConfigRegistry.blocks = config.blocks;
ConfigRegistry.views = config.views;
ConfigRegistry.widgets = config.widgets;
ConfigRegistry.addonRoutes = config.addonRoutes;
ConfigRegistry.addonReducers = config.addonReducers;
ConfigRegistry.components = config.components;
ConfigRegistry.slots = config.slots;
ConfigRegistry.utilities = config.utilities;

// Register slots
Object.entries(slots).forEach(([slotName, components]) => {
  components.forEach(({ name, component, predicates = [] }) => {
    ConfigRegistry.registerSlotComponent({
      slot: slotName,
      name,
      component,
      predicates,
    });
  });
});

registerValidators(ConfigRegistry);
installDefaultComponents(ConfigRegistry);
installDefaultWidgets(ConfigRegistry);
installDefaultViews(ConfigRegistry);
installDefaultBlocks(ConfigRegistry);

applyAddonConfiguration(ConfigRegistry);
