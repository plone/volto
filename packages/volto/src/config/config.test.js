import config from '@plone/volto/registry';

const navigation_controlpanel = {
  '@id': '/@controlpanels/navigation',
  data: {
    displayed_types: [
      {
        title: 'Link',
        token: 'Link',
      },
      {
        title: 'News Item',
        token: 'News Item',
      },
      {
        title: 'Folder',
        token: 'Folder',
      },
      {
        title: 'Page',
        token: 'Document',
      },
      {
        title: 'Event',
        token: 'Event',
      },
      {
        title: 'Collection',
        token: 'Collection',
      },
    ],
    filter_on_workflow: false,
    generate_tabs: true,
    navigation_depth: 3,
    nonfolderish_tabs: true,
    parent_types_not_to_query: ['TempFolder'],
    root: '/',
    show_excluded_items: false,
    sitemap_depth: 3,
    sort_tabs_on: {
      title: 'Position in Parent',
      token: 'getObjPositionInParent',
    },
    sort_tabs_reversed: false,
    workflow_states_to_show: [],
  },
  group: 'General',
  schema: {
    fieldsets: [
      {
        behavior: 'plone',
        fields: [
          'navigation_depth',
          'generate_tabs',
          'nonfolderish_tabs',
          'sort_tabs_on',
          'sort_tabs_reversed',
          'displayed_types',
          'filter_on_workflow',
          'workflow_states_to_show',
          'show_excluded_items',
          'root',
          'sitemap_depth',
          'parent_types_not_to_query',
        ],
        id: 'default',
        title: 'Default',
      },
    ],
    properties: {
      displayed_types: {
        additionalItems: true,
        default: [
          'Link',
          'News Item',
          'Folder',
          'Document',
          'Event',
          'Collection',
        ],
        description:
          'The content types that should be shown in the navigation and site map.',
        factory: 'Tuple',
        items: {
          description: '',
          factory: 'Choice',
          title: '',
          type: 'string',
          vocabulary: {
            '@id':
              'http://localhost:3000/@vocabularies/plone.app.vocabularies.ReallyUserFriendlyTypes',
          },
        },
        title: 'Displayed content types',
        type: 'array',
        uniqueItems: true,
      },
      filter_on_workflow: {
        default: false,
        description:
          'The workflow states that should be shown in the navigation and the site map.',
        factory: 'Yes/No',
        title: 'Filter on workflow state',
        type: 'boolean',
      },
      generate_tabs: {
        default: true,
        description:
          'By default, all items created at the root level will appear as tabs. You can turn this off if you prefer manually constructing this part of the navigation.',
        factory: 'Yes/No',
        title: 'Automatically generate tabs',
        type: 'boolean',
      },
      navigation_depth: {
        default: 3,
        description: 'Number of folder levels to show in the navigation.',
        factory: 'Integer',
        title: 'Navigation depth',
        type: 'integer',
      },
      nonfolderish_tabs: {
        default: true,
        description:
          "By default, any content item in the root of the portal will appear as a tab. If you turn this option off, only folders will be shown. This only has an effect if 'automatically generate tabs' is enabled.",
        factory: 'Yes/No',
        title: 'Generate tabs for items other than folders.',
        type: 'boolean',
      },
      parent_types_not_to_query: {
        additionalItems: true,
        default: ['TempFolder'],
        description: 'Hide content inside the following types in Navigation.',
        factory: 'List',
        items: {
          description: '',
          factory: 'Text line (String)',
          title: '',
          type: 'string',
        },
        title: 'Hide children of these types',
        type: 'array',
        uniqueItems: false,
      },
      root: {
        default: '/',
        description:
          "Path to be used as navigation root, relative to Plone site root.Starts with '/'",
        factory: 'Text line (String)',
        title: 'Root',
        type: 'string',
      },
      show_excluded_items: {
        default: false,
        description:
          'If an item has been excluded from navigation should it be shown in navigation when viewing content contained within it or within a subfolder.',
        factory: 'Yes/No',
        title:
          'Show items normally excluded from navigation if viewing their children.',
        type: 'boolean',
      },
      sitemap_depth: {
        default: 3,
        description: 'Number of folder levels to show in the site map.',
        factory: 'Integer',
        title: 'Sitemap depth',
        type: 'integer',
      },
      sort_tabs_on: {
        choices: [
          ['getObjPositionInParent', 'Position in Parent'],
          ['sortable_title', 'Title'],
          ['getId', 'Short Name (ID)'],
        ],
        default: 'getObjPositionInParent',
        description: 'Index used to sort the tabs',
        enum: ['getObjPositionInParent', 'sortable_title', 'getId'],
        enumNames: ['Position in Parent', 'Title', 'Short Name (ID)'],
        factory: 'Choice',
        title: 'Sort tabs on',
        type: 'string',
        vocabulary: {
          '@id': 'http://localhost:3000/@sources/sort_tabs_on',
        },
      },
      sort_tabs_reversed: {
        default: false,
        description: 'Sort tabs in descending.',
        factory: 'Yes/No',
        title: 'Reversed sort order for tabs.',
        type: 'boolean',
      },
      workflow_states_to_show: {
        additionalItems: true,
        default: [],
        description: '',
        factory: 'Tuple',
        items: {
          description: '',
          factory: 'Choice',
          title: '',
          type: 'string',
          vocabulary: {
            '@id':
              'http://localhost:3000/@vocabularies/plone.app.vocabularies.WorkflowStates',
          },
        },
        title: '',
        type: 'array',
        uniqueItems: true,
      },
    },
    required: ['navigation_depth', 'sort_tabs_on', 'root', 'sitemap_depth'],
    type: 'object',
  },
  title: 'Navigation',
};

test('test navigation controlpanel fields', () => {
  const { filterControlPanelsSchema } = config.settings;
  const result = filterControlPanelsSchema(navigation_controlpanel);
  const not_in_navigation = [
    'generate_tabs',
    'navigation_depth',
    'sort_tabs_on',
    'sort_tabs_reversed',
    'sitemap_depth',
  ];
  const hasField = result['fieldsets'][0]['fields'].some((field) =>
    not_in_navigation.includes(field),
  );
  expect(hasField).toBe(false);
});
