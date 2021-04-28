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
    // schemaExtender: ImageSettingsSchema,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    extensions: {
      variation: [
        {
          id: 'default',
          label: 'Default',
        },
        {
          id: 'custom',
          label: 'Custom',
          // components: {
          //   view: TeaserDefaultTemplate,
          //   wrapper: (props) => (
          //     <>
          //       hey! {props.data.description2} asdasd {props.children} bottoms
          //       thinggy
          //     </>
          //   ),
          // },
          // schemaExtender: schemaExtender,
        },
      ],
    },
  },
};

export const multilingualFixture = (config) => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'it'];

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
      },
    },
  };
};

export default applyConfig;
