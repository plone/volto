import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';

const enhanceSchema = (originalSchema, formData) => {
  const extensionName = 'facetWidgets';
  const extensionType = 'type';
  const variations =
    config.blocks.blocksConfig.searchBlock.extensions[extensionName][
      extensionType
    ];

  const activeItemName = formData?.[extensionType];
  let activeItem = variations?.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations?.find((item) => item.isDefault);

  const schemaEnhancer = activeItem?.['schemaEnhancer'];

  let schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData })
    : cloneDeep(originalSchema);

  return schema;
};

const FacetSchema = () => ({
  title: 'Facet',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'field', 'multiple', 'type', 'hidden'],
    },
  ],
  properties: {
    title: {
      title: 'Label',
    },
    field: {
      title: 'Field',
      widget: 'select_metadata_field',
      vocabulary: { '@id': 'plone.app.vocabularies.MetadataFields' },
    },
    multiple: {
      type: 'boolean',
      title: 'Multiple choices?',
      default: false,
    },
    hidden: {
      type: 'boolean',
      title: 'Hide facet?',
      default: false,
      description:
        'Hidden facets will still filter the results if proper parameters are passed in URLs',
    },
    type: {
      title: 'Facet widget',
      choices: config.blocks.blocksConfig.searchBlock.extensions.facetWidgets.types.map(
        ({ id, title }) => [id, title],
      ),
      defaultValue: config.blocks.blocksConfig.searchBlock.extensions.facetWidgets.types.find(
        ({ isDefault }) => isDefault,
      ).id,
    },
  },
  required: ['field'],
});

export default ({ data = {} }) => {
  return {
    title: 'Search block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title'],
      },
      {
        id: 'controls',
        title: 'Controls',
        fields: [
          'showSearchInput',
          ...(data.showSearchInput ? ['searchInputPrompt'] : []),
          'showSearchButton',
          ...(data.showSearchButton ? ['searchButtonLabel'] : []),
        ],
      },
      {
        id: 'searchquery',
        title: 'Base search query',
        fields: ['query'],
      },
      {
        id: 'facets',
        title: 'Facets',
        fields: ['facets'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
      },
      searchInputPrompt: {
        title: 'Search input label',
      },
      showSearchInput: {
        type: 'boolean',
        title: 'Show search input?',
      },
      showSearchButton: {
        type: 'boolean',
        title: 'Show search button?',
        description: 'This disables the live search',
      },
      searchButtonLabel: {
        title: 'Search button label',
        placeholder: 'Search!',
      },
      facets: {
        title: 'Facets',
        widget: 'object_list',
        schema: FacetSchema(),
        schemaExtender: enhanceSchema,
      },
      query: {
        title: 'Query',
      },
    },
    required: [],
  };
};
