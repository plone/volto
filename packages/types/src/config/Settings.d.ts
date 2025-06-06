import { Content } from '../content';
import { BlocksFormData } from '../blocks/index';
import { ConfigData } from '.';

type apiExpandersType =
  | { match: string; GET_CONTENT: string[] }
  | {
      match: string;
      GET_CONTENT: string[];
      querystring:
        | { [key: string]: string }
        | ((
            config,
            querystring: { config: ConfigData; querystring: object },
          ) => { [key: string]: string });
    };

type styleClassNameExtendersType = ({
  block,
  content,
  data,
  classNames,
}: {
  block: string;
  content: Content;
  data: BlocksFormData;
  classNames: string[];
}) => string[];

export interface SettingsConfig {
  [key: string]: unknown;
  host: string;
  port: string;
  publicURL: string;
  apiPath: string;
  apiExpanders: apiExpandersType[] | [];
  devProxyToApiPath: string | undefined;
  proxyRewriteTarget: string | undefined;
  actions_raising_api_errors: string[];
  internalApiPath: string | undefined;
  websockets: string | false;
  legacyTraverse: string | false;
  cookieExpires: number;
  nonContentRoutes: Array<string | RegExp>;
  richtextEditorSettings: unknown;
  richtextViewSettings: unknown;
  imageObjects: string[];
  reservedIds: string[];
  downloadableObjects: string[];
  viewableInBrowserObjects: string[];
  listingPreviewImageField: string;
  openExternalLinkInNewTab: boolean;
  notSupportedBrowsers: string[];
  defaultPageSize: number;
  supportedLanguages: string[]; // TODO: Improve list of possible values
  navDepth: number;
  expressMiddleware: unknown;
  defaultBlockType: string; // TODO: Improve list of possible values
  verticalFormTabs: boolean;
  useEmailAsLogin: boolean;
  persistentReducers: string[];
  initialReducersBlacklist: string[];
  asyncPropsExtenders: unknown[];
  contentIcons: Record<string, React.ComponentType>;
  loadables: unknown;
  lazyBundles: {
    [key: string]: string[];
  };
  appExtras: {
    match: string;
    component: React.ComponentType;
    props: {
      [key: string]: unknown;
    };
  }[];
  maxResponseSize: number;
  maxFileUploadSize: number | null;
  serverConfig: unknown;
  storeExtenders: unknown[];
  showTags: boolean;
  showRelatedItems: boolean;
  controlpanels: unknown[];
  controlPanelsIcons: Record<string, React.ComponentType>;
  filterControlPanels: unknown;
  filterControlPanelsSchema: unknown;
  externalRoutes: {
    match?: string | { path: string; exact: boolean; strict: boolean };
  }[];

  showSelfRegistration: boolean;
  contentMetadataTagsImageField: string;
  maxUndoLevels: number;
  addonsInfo: unknown;
  workflowMapping: unknown;
  errorHandlers: unknown[];
  styleClassNameConverters: unknown;
  hashLinkSmoothScroll: boolean;
  styleClassNameExtenders: styleClassNameExtendersType[];
  querystringSearchGet: boolean;
  blockSettingsTabFieldsetsInitialStateOpen: boolean;
  excludeLinksAndReferencesMenuItem: boolean;
  siteTitleFormat: {
    includeSiteTitle: boolean;
    titleAndSiteTitleSeparator: string;
  };
  cssLayers: string[];
}
