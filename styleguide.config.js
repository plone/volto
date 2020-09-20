const path = require('path');
const createConfig = require('./node_modules/razzle/config/createConfig.js');

const projectRootPath = path.resolve('.');

const razzleConfig = require(path.join(projectRootPath, 'razzle.config.js'));

module.exports = {
  title: 'Volto Style Guide',
  verbose: false,
  exampleMode: 'expand',
  skipComponentsWithoutExample: true,
  tocMode: 'collapse',
  usageMode: 'expand',
  components: 'src/components/**/*.jsx',
  sections: [
    {
      name: 'Theme',
      components: 'src/components/theme/**/*.jsx',
      content: './docs/styleguide/theme.md',
    },
    {
      name: 'Manage',
      components: 'src/components/manage/**/*.jsx',
      content: './docs/styleguide/manage.md',
    },
    {
      name: 'Helpers',
      components: 'src/helpers/**/*.jsx',
      content: './docs/styleguide/helpers.md',
    },
  ],
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  ignore: [
    '**/*.test.jsx',
    '**/Contents/Contents*jsx',
    '**/Schema.jsx',
    'src/components/manage/AnchorPlugin/index.jsx',
    'src/components/manage/Blocks/Image/Edit.jsx',
    'src/components/manage/Blocks/Image/Schema.jsx',
    'src/components/manage/Blocks/Listing/DefaultTemplate.jsx',
    'src/components/manage/Blocks/Listing/Edit.jsx',
    'src/components/manage/Blocks/Listing/TemplateWidget.jsx',
    'src/components/theme/AppExtras/AppExtras.jsx',
    'src/components/manage/Blocks/Listing/ImageGallery.jsx',
    'src/components/manage/Blocks/Listing/ListingBody.jsx',
    'src/components/manage/Blocks/Listing/ListingData.jsx',
  ],
  require: [
    path.join(__dirname, 'node_modules/semantic-ui-less/semantic.less'),
    path.join(__dirname, 'theme/themes/pastanaga/extras/extras.less'),
  ],
  theme: {
    color: {
      link: 'firebrick',
      linkHover: 'salmon',
    },
  },
  webpackConfig(env) {
    // env is dev
    const baseConfig = createConfig('web', 'dev', {
      // clearConsole: false,
      modify: razzleConfig.modify,
      plugins: razzleConfig.plugins,
    });

    return baseConfig;
  },
  // styleguideComponents: {
  //   Wrapper: path.join(__dirname, 'src/styleguide'),
  // },
};
