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
import { extendedBlockRenderMap, blockStyleFn } from './RichTextEditor/Blocks';
import plugins, { inlineToolbarButtons } from './RichTextEditor/Plugins';
import FromHTMLCustomBlockFn from './RichTextEditor/FromHTML';
import { AvailableTiles, getDefaultEditTileView, messagesTiles } from './Tiles';

export { layoutViews, contentTypesViews, defaultView };
export { widgetMapping, defaultWidget };
export { nonContentRoutes };
export {
  extendedBlockRenderMap,
  blockStyleFn,
  FromHTMLCustomBlockFn,
  inlineToolbarButtons,
  plugins,
  ToHTMLRenderers,
  ToHTMLOptions,
};
export { AvailableTiles, getDefaultEditTileView, messagesTiles };

export default defaults(
  {},
  {
    host: process.env.HOST,
    port: process.env.PORT,
    apiPath: process.env.API_PATH,
    websockets: process.env.WEBSOCKETS,
  },
  {
    host: 'localhost',
    port: '4300',
    apiPath: 'http://localhost:8081/db/web',
    websockets: true,
  },
);
