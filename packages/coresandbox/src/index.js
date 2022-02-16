import ListingBlockVariationTeaserContent from './components/Blocks/Listing/ListingBlockVariationTeaserContent';
import NewsAndEvents from './components/Views/NewsAndEvents';
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
        id: 'listingBlockVariationWithFullobjectsAndData',
        isDefault: false,
        title: 'Listing with items content',
        template: ListingBlockVariationTeaserContent,
        fullobjects: true,
      },
      {
        id: 'listingBlockVariationWithFullobjectsButNoData',
        isDefault: false,
        title: 'Listing without items content',
        template: ListingBlockVariationTeaserContent,
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
    views: {
      ...config.views,
      contentTypesViews: {
        ...config.views.contentTypesViews,
        Folder: NewsAndEvents,
      },
    },
  };
};

export default applyConfig;
