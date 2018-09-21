/**
 * Config.
 * @module config
 */

import { defaultWidget, widgetMapping } from './Widgets';
import { layoutViews, contentTypesViews, defaultView } from './Views';
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
import { customTiles, getDefaultEditTileView, messagesTiles } from './Tiles';

export const settings = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  apiPath: process.env.API_PATH || 'http://localhost:8080/Plone', // for Plone
  // apiPath: process.env.API_PATH || 'http://localhost:8081/db/web', // for guillotina
  nonContentRoutes,
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
  FromHTMLCustomBlockFn,
  richTextEditorInlineToolbarButtons: inlineToolbarButtons,
  richTextEditorPlugins: plugins,
  ToHTMLRenderers,
  ToHTMLOptions,
};

export const widgets = {
  widgetMapping,
  defaultWidget,
};

export const views = {
  layoutViews,
  contentTypesViews,
  defaultView,
};

export const tiles = {
  customTiles,
  getDefaultEditTileView,
  messagesTiles,
};
