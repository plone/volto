import DefaultListingBlockTemplate from '@plone/volto/components/manage/Blocks/Listing/DefaultTemplate';
import TestBlockView from './components/Blocks/TestBlock/View';
import TestBlockEdit from './components/Blocks/TestBlock/Edit';
import codeSVG from '@plone/volto/icons/code.svg';

const addonBlocks = {
  testBlock: {
    id: 'testBlock',
    title: 'testBlock',
    icon: codeSVG,
    group: 'common',
    view: TestBlockView,
    edit: TestBlockEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    variations: [
      {
        id: 'default',
        title: 'Default',
      },
      {
        id: 'custom',
        title: 'Custom',
      },
    ],
    extensions: {},
  },
};

const listing = (config) => {
  return {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'listingBlockVariationWithFullobjects',
        isDefault: false,
        title: 'Listing with items content',
        template: DefaultListingBlockTemplate,
        fullobjects: true,
      },
    ],
  };
};

export const multilingualFixture = (config) => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'it'];

  return config;
};

export const workingCopyFixture = (config) => {
  config.settings.hasWorkingCopySupport = true;

  return config;
};

const applyConfig = (config) => {
  return {
    ...config,
    blocks: {
      ...config.blocks,
      blocksConfig: {
        ...config.blocks.blocksConfig,
        ...addonBlocks,
        listing: listing(config),
      },
    },
  };
};

export default applyConfig;
