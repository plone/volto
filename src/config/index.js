/**
 * Config.
 * @module config
 */
import { defaults } from 'lodash';
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

export { layoutViews, contentTypesViews, defaultView };
export { widgetMapping, defaultWidget };
export { nonContentRoutes };
export {
  extendedBlockRenderMap,
  blockStyleFn,
  listBlockTypes,
  FromHTMLCustomBlockFn,
  inlineToolbarButtons,
  plugins,
  ToHTMLRenderers,
  ToHTMLOptions,
};
export { customTiles, getDefaultEditTileView, messagesTiles };

export default defaults(
  {},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_PATH,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8080/Plone',
  },
);
