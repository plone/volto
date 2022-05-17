import View from './View';
import Edit from './Edit';
import DefaultTocRenderer from './extensions/DefaultTocRenderer';
import HorizontalMenu from './extensions/HorizontalMenu';

const applyConfig = (config) => {
  config.blocks.blocksConfig.toc = {
    ...config.blocks.blocksConfig.toc,
    sidebarTab: 1,
    view: View,
    edit: Edit,
    extensions: [
      {
        id: 'default',
        title: 'Listing (default)',
        view: DefaultTocRenderer,
        schemaExtender: null,
      },
      {
        id: 'horizontalMenu',
        title: 'Horizontal Menu',
        view: HorizontalMenu,
        schemaExtender: null,
      },
    ],
  };

  return config;
};

export default applyConfig;
