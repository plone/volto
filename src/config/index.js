/**
 * Config.
 * @module config
 */
import { parse as parseUrl } from 'url';
import { defaultWidget, widgetMapping } from './Widgets';
import {
  layoutViews,
  contentTypesViews,
  defaultView,
  errorViews,
  layoutViewsNamesMapping,
} from './Views';
import { nonContentRoutes } from './NonContentRoutes';
import {
  groupBlocksOrder,
  requiredBlocks,
  blocksConfig,
  initialBlocks,
  initialBlocksFocus,
} from './Blocks';
import { components } from './Components';
import { loadables } from './Loadables';
import { workflowMapping } from './Workflows';

import { contentIcons } from './ContentIcons';
import { styleClassNameConverters } from './Style';
import {
  controlPanelsIcons,
  filterControlPanels,
  filterControlPanelsSchema,
} from './ControlPanels';

import { richtextEditorSettings, richtextViewSettings } from './RichTextEditor';

import applyAddonConfiguration, { addonsInfo } from 'load-volto-addons';

import ConfigRegistry from '@plone/volto/registry';

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
    apiPath,
    apiExpanders: [],
    // Internal proxy to bypass CORS *while developing*. NOT intended for production use.
    // In production is recommended you use a Seamless mode deployment using a web server in
    // front of both the frontend and the backend so you can bypass CORS safely.
    // https://docs.voltocms.com/deploying/seamless-mode/
    devProxyToApiPath:
      process.env.RAZZLE_DEV_PROXY_API_PATH ||
      process.env.RAZZLE_API_PATH ||
      'http://localhost:8080/Plone', // Set it to '' for disabling the proxy
    // proxyRewriteTarget Set it for set a custom target for the proxy or overide the internal VHM rewrite
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
    richtextEditorSettings, // Part of draftjs support, to be removed
    richtextViewSettings, // Part of draftjs support, to be removed
    imageObjects: ['Image'],
    reservedIds: ['login', 'layout', 'plone', 'zip', 'properties'],
    downloadableObjects: ['File'], //list of content-types for which the direct download of the file will be carried out if the user is not authenticated
    viewableInBrowserObjects: [], //ex: ['File']. List of content-types for which the file will be displayed in browser if the user is not authenticated
    listingPreviewImageField: 'image', // deprecated from Volto 14 onwards
    notSupportedBrowsers: ['ie'],
    defaultPageSize: 25,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    navDepth: 1,
    expressMiddleware: serverConfig.expressMiddleware, // BBB
    defaultBlockType: 'slate',
    verticalFormTabs: false,
    useEmailAsLogin: false,
    persistentReducers: ['blocksClipboard'],
    initialReducersBlacklist: [], // reducers in this list won't be hydrated in windows.__data
    asyncPropsExtenders: [], // per route asyncConnect customizers
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
      draftEditor: [
        'immutableLib',
        'draftJs',
        'draftJsLibIsSoftNewlineEvent',
        'draftJsFilters',
        'draftJsInlineToolbarPlugin',
        'draftJsImportHtml',
        'draftJsBlockBreakoutPlugin',
      ],
    },
    appExtras: [],
    maxResponseSize: 2000000000, // This is superagent default (200 mb)
    serverConfig,
    storeExtenders: [],
    showTags: true,
    controlpanels: [],
    controlPanelsIcons,
    filterControlPanels,
    filterControlPanelsSchema,
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
    hasWorkingCopySupport: false,
    maxUndoLevels: 200, // undo history size for the main form
    addonsInfo: addonsInfo,
    workflowMapping,
    errorHandlers: [], // callables for unhandled errors
    styleClassNameConverters,
  },
  experimental: {
    addBlockButton: {
      enabled: false,
    },
  },
  widgets: {
    ...widgetMapping,
    default: defaultWidget,
  },
  views: {
    layoutViews,
    contentTypesViews,
    defaultView,
    errorViews,
    layoutViewsNamesMapping,
  },
  blocks: {
    requiredBlocks,
    blocksConfig,
    groupBlocksOrder,
    initialBlocks,
    initialBlocksFocus,
    showEditBlocksInBabelView: false,
  },
  addonRoutes: [],
  addonReducers: {},
  components,
};

ConfigRegistry.settings = config.settings;
ConfigRegistry.experimental = config.experimental;
ConfigRegistry.blocks = config.blocks;
ConfigRegistry.views = config.views;
ConfigRegistry.widgets = config.widgets;
ConfigRegistry.addonRoutes = config.addonRoutes;
ConfigRegistry.addonReducers = config.addonReducers;
ConfigRegistry.components = config.components;

applyAddonConfiguration(ConfigRegistry);
