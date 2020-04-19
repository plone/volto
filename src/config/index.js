/**
 * Config.
 * @module config
 */

import { defaultWidget, widgetMapping } from './Widgets';
import {
  layoutViews,
  contentTypesViews,
  defaultView,
  errorViews,
} from './Views';
import { nonContentRoutes } from './NonContentRoutes';
import ToHTMLRenderers, {
  options as ToHTMLOptions,
} from './RichTextEditor/ToHTML';
import {
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
} from './RichTextEditor/Blocks';
import plugins, { inlineToolbarButtons } from './RichTextEditor/Plugins';
import FromHTMLCustomBlockFn from './RichTextEditor/FromHTML';
import {
  groupBlocksOrder,
  requiredBlocks,
  blocksConfig,
  initialBlocks,
} from './Blocks';

export const settings = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  // Internal proxy to bypass CORS *while developing*. Not intended for production use.
  // For the sake of simplicty, we only allow http://localhost:3000/api as proxied api path
  // If you specify a different apiPath, internal proxy won't be enabled
  // In production, the proxy is disabled, make sure you specify an apiPath that does
  // not require CORS to work.
  apiPath: process.env.RAZZLE_API_PATH || 'http://localhost:3000/api', // for Plone
  proxyToApiPath: 'http://localhost:8080', // Not used if apiPath is not http://localhost:3000/api
  // apiPath: process.env.RAZZLE_API_PATH || 'http://localhost:8000', // for Volto reference
  // apiPath: process.env.RAZZLE_API_PATH || 'http://localhost:8081/db/web', // for guillotina
  internalApiPath: process.env.RAZZLE_INTERNAL_API_PATH || undefined,
  websockets: process.env.RAZZLE_WEBSOCKETS || false,
  nonContentRoutes,
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
  FromHTMLCustomBlockFn,
  richTextEditorInlineToolbarButtons: inlineToolbarButtons,
  richTextEditorPlugins: plugins,
  ToHTMLRenderers,
  ToHTMLOptions,
  imageObjects: ['Image'],
  listingPreviewImageField: 'image',
  customStyleMap: null,
  notSupportedBrowsers: ['ie'],
  defaultPageSize: 25,
  isMultilingual: false,
  supportedLanguages: ['en'],
  defaultLanguage: 'en',
};

export const widgets = {
  ...widgetMapping,
  default: defaultWidget,
};

export const views = {
  layoutViews,
  contentTypesViews,
  defaultView,
  errorViews,
};

export const blocks = {
  requiredBlocks,
  blocksConfig,
  groupBlocksOrder,
  initialBlocks,
};
