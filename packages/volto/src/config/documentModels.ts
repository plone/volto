import type { ConfigType } from '@plone/registry';

export const DEFAULT_DOCUMENT_MODEL = 'plone.blocks';

// How content stores its blocks, as the `@blocks-schema` endpoint announces
// it. `plone.blocks` is Volto's: the blocks keyed by ID in `blocks`, and their
// order in `blocks_layout.items`. Its docs are in
// `components/manage/Blocks/document-model.block.md`.
const registerDocumentModels = (config: ConfigType) => {
  config.registerUtility({
    name: DEFAULT_DOCUMENT_MODEL,
    type: 'documentModel',
    method: () => ({
      id: DEFAULT_DOCUMENT_MODEL,
      version: 1,
    }),
  });
};

export default registerDocumentModels;
