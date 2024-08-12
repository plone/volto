import ListingBlockVariationTeaserContent from './components/Blocks/Listing/ListingBlockVariationTeaserContent';
import NewsAndEvents from './components/Views/NewsAndEvents';
import TestBlockView from './components/Blocks/TestBlock/View';
import TestBlockEdit from './components/Blocks/TestBlock/Edit';
import InputBlockView from './components/Blocks/InputBlock/View';
import InputBlockEdit from './components/Blocks/InputBlock/Edit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { SliderSchema as TestBlockSchema } from './components/Blocks/TestBlock/schema';
import { inputBlockSchema } from './components/Blocks/InputBlock/schema';
import { multipleFieldsetsSchema } from './components/Blocks/TestBlock/schema';
import { conditionalVariationsSchemaEnhancer } from './components/Blocks/schemaEnhancers';
import codeSVG from '@plone/volto/icons/code.svg';
import type { BlockConfigBase } from '@plone/types';
import type { ConfigType } from '@plone/registry';
import SlotComponentTest from './components/Slots/SlotTest';
import { ContentTypeCondition } from '@plone/volto/helpers';
import { RouteCondition } from '@plone/volto/helpers/Slots';
import TestForm from './components/TestForm';
import FormBlockView from './components/Blocks/FormBlock/View';
import FormBlockEdit from './components/Blocks/FormBlock/Edit';
import { formBlockSchema } from './components/Blocks/FormBlock/schema';
const testBlock: BlockConfigBase = {
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
      isDefault: true,
    },
    {
      id: 'custom',
      title: 'Custom',
    },
  ],
  extensions: {},
};
const inputBlock: BlockConfigBase = {
  id: 'inputBlock',
  title: 'Input Block',
  icon: codeSVG,
  group: 'common',
  view: InputBlockView,
  edit: InputBlockEdit,
  blockSchema: inputBlockSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,

  extensions: {},
};

const testBlockConditional: BlockConfigBase = {
  ...testBlock,
  id: 'testBlockConditional',
  title: 'Test Conditional Block',
  restricted: ({ properties, navRoot, contentType }) => {
    if (contentType === 'News Item') {
      return false;
    } else if (flattenToAppURL(properties?.parent?.['@id']) === '/folder') {
      return false;
    }
    return true;
  },
};

const testBlockWithConditionalVariations: BlockConfigBase = {
  ...testBlock,
  id: 'testBlockWithConditionalVariations',
  title: 'Test Block with Conditional Variations',
  schemaEnhancer: conditionalVariationsSchemaEnhancer,
};

const testBlockMultipleFieldsets: BlockConfigBase = {
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

const testBlockDefaultEdit: BlockConfigBase = {
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

const testBlockDefaultView: BlockConfigBase = {
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
const testformBlock: BlockConfigBase = {
  id: 'testformBlock',
  title: 'Form Block',
  icon: codeSVG,
  group: 'common',
  view: FormBlockView,
  edit: FormBlockEdit,
  blockSchema: formBlockSchema,
  restricted: false,
  mostUsed: true,
  sidebarTab: 1,

  extensions: {},
};

const listing = (config: ConfigType) => {
  return {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...(config.blocks.blocksConfig.listing.variations || []),
      {
        id: 'listingBlockVariationWithFullobjectsAndData',
        title: 'Listing with items content',
        template: ListingBlockVariationTeaserContent,
        fullobjects: true,
      },
      {
        id: 'listingBlockVariationWithFullobjectsButNoData',
        title: 'Listing without items content',
        template: ListingBlockVariationTeaserContent,
      },
    ],
  };
};

export const multilingualFixture = (config: ConfigType) => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'it'];

  return config;
};

export const workingCopyFixture = (config: ConfigType) => {
  config.settings.hasWorkingCopySupport = true;

  return config;
};

// We extend the block types with the custom ones
declare module '@plone/types' {
  export interface BlocksConfigData {
    testBlock: BlockConfigBase;
    inputBlock: BlockConfigBase;
    testBlockConditional: BlockConfigBase;
    testBlockWithConditionalVariations: BlockConfigBase;
    testBlockMultipleFieldsets: BlockConfigBase;
    testBlockDefaultEdit: BlockConfigBase;
    testBlockDefaultView: BlockConfigBase;
    testformBlock: BlockConfigBase;
  }
}

const applyConfig = (config: ConfigType) => {
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/form',
      component: TestForm,
      exact: false,
    },
  ];
  config.blocks.blocksConfig.testBlock = testBlock;
  config.blocks.blocksConfig.inputBlock = inputBlock;
  config.blocks.blocksConfig.testBlockConditional = testBlockConditional;
  config.blocks.blocksConfig.testBlockWithConditionalVariations =
    testBlockWithConditionalVariations;
  config.blocks.blocksConfig.testBlockMultipleFieldsets =
    testBlockMultipleFieldsets;
  config.blocks.blocksConfig.testBlockDefaultEdit = testBlockDefaultEdit;
  config.blocks.blocksConfig.testBlockDefaultView = testBlockDefaultView;
  config.blocks.blocksConfig.testformBlock = testformBlock;
  config.blocks.blocksConfig.listing = listing(config);
  config.views.contentTypesViews.Folder = NewsAndEvents;

  config.registerSlotComponent({
    slot: 'aboveContent',
    name: 'testSlotComponent',
    component: SlotComponentTest,
    predicates: [ContentTypeCondition(['Document']), RouteCondition('/hello')],
  });

  return config;
};

export default applyConfig;
