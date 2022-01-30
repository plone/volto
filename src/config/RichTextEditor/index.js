import ToHTMLRenderers, { options as ToHTMLOptions } from './ToHTML';
import { extendedBlockRenderMap, blockStyleFn, listBlockTypes } from './Blocks';
import Plugins from './Plugins';
import FromHTMLCustomBlockFn from './FromHTML';

export const richtextEditorSettings = (props) => {
  const { plugins, inlineToolbarButtons } = Plugins(props);

  return {
    extendedBlockRenderMap: extendedBlockRenderMap(props),
    blockStyleFn: blockStyleFn,
    listBlockTypes: listBlockTypes,
    FromHTMLCustomBlockFn: FromHTMLCustomBlockFn(props),
    richTextEditorPlugins: plugins,
    richTextEditorInlineToolbarButtons: inlineToolbarButtons,
  };
};

export const richtextViewSettings = {
  ToHTMLRenderers,
  ToHTMLOptions,
};
