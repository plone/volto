import ListingBlockVariationTeaserContent from './components/Blocks/Listing/ListingBlockVariationTeaserContent';
import NewsAndEvents from './components/Views/NewsAndEvents';
import TestBlockView from './components/Blocks/TestBlock/View';
import TestBlockEdit from './components/Blocks/TestBlock/Edit';
import { SliderSchema as TestBlockSchema } from './components/Blocks/TestBlock/schema';
import { multipleFieldsetsSchema } from './components/Blocks/TestBlock/schema';
import codeSVG from '@plone/volto/icons/code.svg';

const testBlock = {
  id: 'testBlock',
  title: 'testBlock',
  icon: codeSVG,
  group: 'common',
  view: TestBlockView,
  edit: TestBlockEdit,
  blockSchema: TestBlockSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,
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
};

const testBlockMultipleFieldsets = {
  id: 'testBlockMultipleFieldsets',
  title: 'testBlockMultipleFieldsets',
  icon: codeSVG,
  group: 'common',
  view: TestBlockView,
  edit: TestBlockEdit,
  blockSchema: multipleFieldsetsSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,
};

const testBlockDefaultEdit = {
  id: 'testBlockDefaultEdit',
  title: 'testBlockDefaultEdit',
  icon: codeSVG,
  group: 'common',
  view: TestBlockView,
  blockSchema: TestBlockSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,
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
};

const testBlockDefaultView = {
  id: 'testBlockDefaultView',
  title: 'testBlockDefaultView',
  icon: codeSVG,
  group: 'common',
  blockSchema: TestBlockSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,
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
  config.blocks.blocksConfig.testBlock = testBlock;
  config.blocks.blocksConfig.testBlockMultipleFieldsets = testBlockMultipleFieldsets;
  config.blocks.blocksConfig.testBlockDefaultEdit = testBlockDefaultEdit;
  config.blocks.blocksConfig.testBlockDefaultView = testBlockDefaultView;
  config.blocks.blocksConfig.listing = listing(config);
  config.views.contentTypesViews.Folder = NewsAndEvents;

  return config;
};

export default applyConfig;
