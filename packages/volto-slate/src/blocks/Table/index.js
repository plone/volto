import codeSVG from '@plone/volto/icons/code.svg';
import TableBlockEdit from './TableBlockEdit';
import TableBlockView from './TableBlockView';
import { extractTables } from './deconstruct';
import { normalizeTable } from './extensions/normalizeTable';

/**
 * @summary Called from Volto to configure new or existing Volto block types.
 * @param {object} config The object received from Volto containing the
 * configuration for all the blocks.
 */
export default function install(config) {
  config.settings.slate = {
    ...config.settings.slate,
    voltoBlockEmiters: [
      ...(config.settings.slate.voltoBlockEmiters || []),
      extractTables,
    ],
    tableblockExtensions: [
      // First here gets executed last
      // withLists,
      // withSplitBlocksOnBreak,
      // withDeleteSelectionOnEnter,
      // withDeserializers,
      // breakList,
      normalizeTable,
    ],
  };

  config.blocks.blocksConfig.slateTable = {
    id: 'slateTable',
    title: 'Slate Table',
    icon: codeSVG,
    group: 'text',
    view: TableBlockView,
    edit: TableBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    // blockHasValue: (data) => {
    //   return true;
    // },
  };
  return config;
}
