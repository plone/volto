export function richtextEditorSettings(props: any): {
    extendedBlockRenderMap: any;
    blockStyleFn: (contentBlock: any) => string;
    listBlockTypes: string[];
    richTextEditorPlugins: any[];
    richTextEditorInlineToolbarButtons: any[];
    FromHTMLCustomBlockFn: typeof FromHTMLCustomBlockFn;
    customStyleMap: any;
};
export namespace richtextViewSettings {
    export { ToHTMLRenderers };
    export { ToHTMLOptions };
}
import FromHTMLCustomBlockFn from './FromHTML';
import ToHTMLRenderers from './ToHTML';
import { options as ToHTMLOptions } from './ToHTML';
