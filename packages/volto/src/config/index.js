import ConfigRegistry from '@plone/volto/registry';
import { parse as parseUrl } from 'url';
import { nonContentRoutes } from './NonContentRoutes';
import { nonContentRoutesPublic } from './NonContentRoutesPublic';
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

import applyAddonConfiguration, {
  addonsInfo,
} from '@plone/registry/addons-loader';

import { installDefaultComponents } from './Components';
import { installDefaultWidgets } from './Widgets';
import { installDefaultViews } from './Views';
import { installDefaultBlocks } from './Blocks';

import { getSiteAsyncPropExtender } from '@plone/volto/helpers/Site';
import { registerValidators } from './validation';

const host = import.meta.env.HOST || 'localhost';
const port = import.meta.env.PORT || '3000';

const apiPath =
  import.meta.env.PLONE_API_PATH ||
  (__DEVELOPMENT__ ? `http://${host}:${port}` : '');

const getServerURL = (url) => {
  if (!url) return;
  const apiPathURL = parseUrl(url);
  return `${apiPathURL.protocol}//${apiPathURL.hostname}${
    apiPathURL.port ? `:${apiPathURL.port}` : ''
  }`;
};

// Sensible defaults for publicURL
// if PLONE_PUBLIC_URL is present, use it
// if in DEV, use the host/port combination by default
// if in PROD, assume it's PLONE_API_PATH server name (no /api or alikes) or fallback
// to DEV settings if PLONE_API_PATH is not present
const publicURL =
  import.meta.env.PLONE_PUBLIC_URL ||
  (__DEVELOPMENT__
    ? `http://${host}:${port}`
    : getServerURL(import.meta.env.PLONE_API_PATH) || `http://${host}:${port}`);

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
      import.meta.env.PLONE_DEV_PROXY_API_PATH ||
      import.meta.env.PLONE_INTERNAL_API_PATH ||
      import.meta.env.PLONE_API_PATH ||
      'http://localhost:8080/Plone', // Set it to '' for disabling the proxy
    // proxyRewriteTarget Set it for set a custom target for the proxy or override the internal VHM rewrite
    // proxyRewriteTarget: '/VirtualHostBase/http/localhost:8080/Plone/VirtualHostRoot/_vh_api'
    // proxyRewriteTarget: 'https://myvoltositeinproduction.com'
    proxyRewriteTarget: import.meta.env.PLONE_PROXY_REWRITE_TARGET || undefined,
    // apiPath: import.meta.env.PLONE_API_PATH || 'http://localhost:8000', // for Volto reference
    // apiPath: import.meta.env.PLONE_API_PATH || 'http://localhost:8081/db/web', // for guillotina
    actions_raising_api_errors: ['GET_CONTENT', 'UPDATE_CONTENT'],
    internalApiPath: import.meta.env.PLONE_INTERNAL_API_PATH || undefined,
    websockets: import.meta.env.PLONE_WEBSOCKETS || false,
    // TODO: legacyTraverse to be removed when the use of the legacy traverse is deprecated.
    legacyTraverse: import.meta.env.PLONE_LEGACY_TRAVERSE || false,
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
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    navDepth: 1,
    defaultBlockType: 'slate',
    verticalFormTabs: false,
    useEmailAsLogin: false,
    persistentReducers: ['blocksClipboard'],
    initialReducersBlacklist: [], // reducers in this list won't be hydrated in windows.__data
    asyncPropsExtenders: [getSiteAsyncPropExtender], // per route asyncConnect customizers
    contentIcons: contentIcons,
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
    storeExtenders: [],
    showTags: true,
    showRelatedItems: false,
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
    hasWorkingCopySupport: false,
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
    GET_CONTENT: ['breadcrumbs', 'actions', 'types', 'navroot'],
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

const currentConfig = applyAddonConfiguration(ConfigRegistry);

// [Vite] This is required to pass the evaluated config to the Express Server
// not as an import side-effect but as a return value.
export { currentConfig };
