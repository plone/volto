import ToHTMLRenderers, { options as ToHTMLOptions } from './ToHTML';
import { extendedBlockRenderMap, blockStyleFn, listBlockTypes } from './Blocks';
import plugins, { inlineToolbarButtons } from './Plugins';
import FromHTMLCustomBlockFn from './FromHTML';

export const richtextEditorSettings = (props) => {
  return {
    extendedBlockRenderMap: extendedBlockRenderMap(props),
    blockStyleFn: blockStyleFn,
    listBlockTypes: listBlockTypes,
    FromHTMLCustomBlockFn: FromHTMLCustomBlockFn(props),
    richTextEditorPlugins: plugins(props),
    richTextEditorInlineToolbarButtons: inlineToolbarButtons(props),
    ToHTMLRenderers: ToHTMLRenderers(props),
    ToHTMLOptions,
  };
};

export default richtextEditorSettings;
