import TableBlockEdit from './TableBlockEdit';
import TableBlockView from './TableBlockView';
import { extractTables } from './deconstruct';
import { normalizeTable } from './extensions/normalizeTable';
import { normalizeExternalData } from '../Text/extensions';

import tableSVG from '@plone/volto/icons/table.svg';

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
      normalizeExternalData,
    ],
  };

  const tableBlockConfig = {
    id: 'table',
    title: 'Table',
    icon: tableSVG,
    group: 'common',
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

  config.blocks.blocksConfig.table.restricted = true;
  config.blocks.blocksConfig.slateTable = {
    ...tableBlockConfig,
    id: 'slateTable',
  };

  return config;
}
