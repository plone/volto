import ToHTMLRenderers, { options as ToHTMLOptions } from './ToHTML';
import Blocks from './Blocks';
import Plugins from './Plugins';
import FromHTMLCustomBlockFn from './FromHTML';

export const richtextEditorSettings = (props) => {
  const { plugins, inlineToolbarButtons } = Plugins(props);
  const { extendedBlockRenderMap, blockStyleFn, listBlockTypes } =
    Blocks(props);

  return {
    extendedBlockRenderMap,
    blockStyleFn: blockStyleFn,
    listBlockTypes: listBlockTypes,
    richTextEditorPlugins: plugins,
    richTextEditorInlineToolbarButtons: inlineToolbarButtons,
    FromHTMLCustomBlockFn,
    customStyleMap: null,
  };
};

export const richtextViewSettings = {
  ToHTMLRenderers,
  ToHTMLOptions,
};
