import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';
import { cloneDeep } from 'lodash';
import { hasNonValueOperation, hasDateOperation } from './utils';

const messages = defineMessages({
  searchBlock: {
    id: 'Search block',
    defaultMessage: 'Search block',
  },
  controls: {
    id: 'Controls',
    defaultMessage: 'Controls',
  },
  baseSearchQuery: {
    id: 'Base search query',
    defaultMessage: 'Base search query',
  },
  sectionTitle: {
    id: 'Section title',
    defaultMessage: 'Section title',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  searchInputPrompt: {
    id: 'Search input label',
    defaultMessage: 'Search input label',
  },
  showSearchInput: {
    id: 'Show search input?',
    defaultMessage: 'Show search input?',
  },
  showSearchButtonTitle: {
    id: 'Show search button?',
    defaultMessage: 'Show search button?',
  },
  showSearchButtonDescription: {
    id:
      'The button presence disables the live search, the query is issued when you press ENTER',
    defaultMessage:
      'The button presence disables the live search, the query is issued when you press ENTER',
  },
  searchButtonLabel: {
    id: 'Search button label',
    defaultMessage: 'Search button label',
  },
  searchButtonPlaceholder: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  showSortOn: {
    id: 'Show sorting?',
    defaultMessage: 'Show sorting?',
  },
  sortOnOptions: {
    id: 'Sort on options',
    defaultMessage: 'Sort on options',
  },
  facets: {
    id: 'Facets',
    defaultMessage: 'Facets',
  },
  facet: {
    id: 'Facet',
    defaultMessage: 'Facet',
  },
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
  field: {
    id: 'Field',
    defaultMessage: 'Field',
  },
  multipleChoices: {
    id: 'Multiple choices?',
    defaultMessage: 'Multiple choices?',
  },
  hideFacetTitle: {
    id: 'Hide facet?',
    defaultMessage: 'Hide facet?',
  },
  hideFacetDescription: {
    id:
      'Hidden facets will still filter the results if proper parameters are passed in URLs',
    defaultMessage:
      'Hidden facets will still filter the results if proper parameters are passed in URLs',
  },
  advancedFacetTitle: {
    id: 'Advanced facet?',
    defaultMessage: 'Advanced facet?',
  },
  advancedFacetDescription: {
    id: 'Advanced facets are initially hidden and displayed on demand',
    defaultMessage:
      'Advanced facets are initially hidden and displayed on demand',
  },
  facetWidget: {
    id: 'Facet widget',
    defaultMessage: 'Facet widget',
  },
  views: {
    id: 'views',
    defaultMessage: 'Views',
  },
  availableViews: {
    id: 'availableViews',
    defaultMessage: 'Available views',
  },
  showTotalResults: {
    id: 'Show total results',
    defaultMessage: 'Show total results',
  },
});

const enhanceSchema = (originalSchema, formData) => {
  const extensionName = 'facetWidgets';
  const extensionType = 'type'; // property name in stored block data
  const variations =
    config.blocks.blocksConfig.search.extensions[extensionName].types;

  const activeItemName = formData?.[extensionType];
  let activeItem = variations?.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations?.find((item) => item.isDefault);

  const schemaEnhancer = activeItem?.['schemaEnhancer'];

  let schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData })
    : cloneDeep(originalSchema);

  return schema;
};

const FacetSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.facet),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'field', 'type', 'hidden', 'advanced'],
    },
  ],
  properties: {
    title: {
      title: intl.formatMessage(messages.label),
    },
    field: {
      title: intl.formatMessage(messages.field),
      widget: 'select_querystring_field',
      vocabulary: { '@id': 'plone.app.vocabularies.MetadataFields' },
      filterOptions: (options) => {
        // Only allows indexes that provide simple, fixed vocabularies.
        // This should be improved, together with the facets. The querystring
        // widget implementation should serve as inspiration for those dynamic
        // types of facets.
        return Object.assign(
          {},
          ...Object.keys(options).map((k) =>
            Object.keys(options[k].values || {}).length ||
            hasNonValueOperation(options[k].operations) ||
            hasDateOperation(options[k].operations)
              ? { [k]: options[k] }
              : {},
          ),
        );
      },
    },
    multiple: {
      type: 'boolean',
      title: intl.formatMessage(messages.multipleChoices),
      default: false,
    },
    hidden: {
      type: 'boolean',
      title: intl.formatMessage(messages.hideFacetTitle),
      default: false,
      description: intl.formatMessage(messages.hideFacetDescription),
    },
    advanced: {
      type: 'boolean',
      title: intl.formatMessage(messages.advancedFacetTitle),
      default: false,
      description: intl.formatMessage(messages.advancedFacetDescription),
    },
    type: {
      title: intl.formatMessage(messages.facetWidget),
      choices: config.blocks.blocksConfig.search.extensions.facetWidgets.types.map(
        ({ id, title }) => [
          id,
          `${intl.formatMessage({ id: id, defaultMessage: title })}`,
        ],
      ),
      defaultValue: config.blocks.blocksConfig.search.extensions.facetWidgets.types.find(
        ({ isDefault }) => isDefault,
      ).id,
    },
  },
  required: ['field'],
});

const SearchSchema = ({ data = {}, intl }) => {
  return {
    title: intl.formatMessage(messages.searchBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline'],
      },
      {
        id: 'searchquery',
        title: intl.formatMessage(messages.baseSearchQuery),
        fields: ['query'],
      },
      {
        id: 'facets',
        title: intl.formatMessage(messages.facets),
        fields: ['facetsTitle', 'facets'],
      },
      {
        id: 'controls',
        title: intl.formatMessage(messages.controls),
        fields: [
          'showSortOn',
          ...(data.showSortOn ? ['sortOnOptions'] : []),
          'showSearchInput',
          ...(data.showSearchInput ?? true ? ['showSearchButton'] : []),
          // ...(data.showSearchInput ? ['searchInputPrompt'] : []),
          // ...(data.showSearchButton ? ['searchButtonLabel'] : []),
          'showTotalResults',
        ],
      },
      {
        id: 'views',
        title: intl.formatMessage(messages.views),
        fields: ['availableViews'],
      },
    ],
    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
      },
      searchInputPrompt: {
        title: intl.formatMessage(messages.searchInputPrompt),
      },
      showSearchInput: {
        type: 'boolean',
        title: intl.formatMessage(messages.showSearchInput),
        default: true,
      },
      showSearchButton: {
        type: 'boolean',
        title: intl.formatMessage(messages.showSearchButtonTitle),
        description: intl.formatMessage(messages.showSearchButtonDescription),
      },
      showTotalResults: {
        type: 'boolean',
        title: intl.formatMessage(messages.showTotalResults),
        default: true,
      },
      searchButtonLabel: {
        title: intl.formatMessage(messages.searchButtonLabel),
        placeholder: intl.formatMessage(messages.searchButtonPlaceholder),
      },
      showSortOn: {
        type: 'boolean',
        title: intl.formatMessage(messages.showSortOn),
      },
      sortOnOptions: {
        title: intl.formatMessage(messages.sortOnOptions),
        widget: 'array',
      },
      facets: {
        title: intl.formatMessage(messages.facets),
        widget: 'object_list',
        schema: FacetSchema({ intl }),
        schemaExtender: enhanceSchema,
      },
      facetsTitle: {
        title: intl.formatMessage(messages.sectionTitle),
      },
      query: {
        title: 'Query',
      },
      availableViews: {
        title: intl.formatMessage(messages.availableViews),
        choices: config.blocks.blocksConfig.listing.variations.map(
          ({ id, title }) => [id, title],
        ),
        widget: 'array',
      },
    },
    required: [],
  };
};

export default SearchSchema;
