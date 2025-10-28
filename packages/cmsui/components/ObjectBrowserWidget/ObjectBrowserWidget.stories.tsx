import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RouterProvider,
  createMemoryRouter,
  type LoaderFunctionArgs,
} from 'react-router';
import { I18nextProvider } from 'react-i18next';
import type { PartialBrainWithRequired } from './utils';
import { ObjectBrowserWidget } from './ObjectBrowserWidget';

const STORY_ROOT_ID = '/storybook-root';

const translations = {
  'cmsui.objectbrowserwidget.openDialog': 'Select content',
  'cmsui.objectbrowserwidget.dialogTitle': 'Select Content',
  'cmsui.objectbrowserwidget.closeDialog': 'Close selection',
  'cmsui.objectbrowserwidget.openSearch': 'Open search',
  'cmsui.objectbrowserwidget.closeSearch': 'Close search',
  'cmsui.objectbrowserwidget.searchPlaceholder': 'Search content...',
  'cmsui.objectbrowserwidget.goback': 'Go back',
  'cmsui.objectbrowserwidget.home': 'Home',
  'cmsui.objectbrowserwidget.changeViewMode': 'Change view mode to {{mode}}',
  'cmsui.objectbrowserwidget.viewModes.list': 'list',
  'cmsui.objectbrowserwidget.viewModes.grid': 'grid',
  'cmsui.objectbrowserwidget.currentItems': 'Current items',
  'cmsui.objectbrowserwidget.loading': 'Loading...',
  'cmsui.objectbrowserwidget.noResults': 'No content found',
  'cmsui.objectbrowserwidget.searchResultsFor':
    'Search results for "{{searchTerm}}" ({{count}})',
  'cmsui.objectbrowserwidget.searchResults': 'Found {{count}} results',
  'cmsui.objectbrowserwidget.routeannouncer': 'Current path: {{route}}.',
  'cmsui.objectbrowserwidget.item': '{{title}} ({{selected}})',
  'cmsui.objectbrowserwidget.itemNavigateTo': 'Navigate to {{title}}',
  'cmsui.objectbrowserwidget.itemNotSelectable': 'Not selectable',
  'cmsui.objectbrowserwidget.selected': 'Selected',
  'cmsui.objectbrowserwidget.canNavigateTo': 'Folder',
  'cmsui.objectbrowserwidget.workflowStates.published': 'Published',
  'cmsui.objectbrowserwidget.workflowStates.pending': 'Pending',
  'cmsui.objectbrowserwidget.workflowStates.private': 'Private',
} as const;

const formatTranslation = (value: string, options?: Record<string, unknown>) =>
  options
    ? value.replace(/{{(.*?)}}/g, (_, match) => {
        const key = String(match).trim();
        const replacement = options[key];
        return replacement === undefined ? '' : String(replacement);
      })
    : value;

const translate = (key: string, options?: Record<string, unknown>) => {
  const template = translations[key as keyof typeof translations];
  if (!template) return key;
  return formatTranslation(template, options);
};

const storyI18n = {
  language: 'en',
  languages: ['en'],
  isInitialized: true,
  initializedStoreOnce: true,
  options: {
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackLng: 'en',
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
    },
  },
  reportNamespaces: {
    addUsedNamespaces: () => {},
  },
  services: {
    backendConnector: {},
  },
  store: {
    on: () => {},
    off: () => {},
  },
  t: translate,
  getFixedT: () => translate,
  hasLoadedNamespace: () => true,
  changeLanguage: async () => 'en',
  loadNamespaces: (_ns: string | string[], callback?: () => void) => {
    callback?.();
    return Promise.resolve();
  },
  loadLanguages: (
    _lng: string,
    _ns: string | string[],
    callback?: () => void,
  ) => {
    callback?.();
    return Promise.resolve();
  },
  on: () => {},
  off: () => {},
  emit: () => {},
} as const satisfies Record<string, unknown>;

type ObjectBrowserWidgetStoryProps = React.ComponentProps<
  typeof ObjectBrowserWidget
> & {
  title?: string;
  defaultValue?: Array<Record<string, unknown>>;
  widgetOptions?: Record<string, unknown>;
  mode?: 'single' | 'multiple';
  onChange?: (value: unknown) => void;
};

type MockNode = PartialBrainWithRequired & {
  parent?: string;
  review_state?: string;
};

const MOCK_NODES: MockNode[] = [
  {
    '@id': STORY_ROOT_ID,
    '@type': 'Folder',
    title: 'Storybook Site Root',
    description: 'Top level of the storybook site',
    is_folderish: true,
    UID: 'root',
  },
  {
    '@id': `${STORY_ROOT_ID}/welcome-document`,
    '@type': 'Document',
    title: 'Welcome Document',
    description: 'Introduction to the site',
    parent: STORY_ROOT_ID,
    UID: 'doc-1',
    review_state: 'published',
  },
  {
    '@id': `${STORY_ROOT_ID}/media`,
    '@type': 'Folder',
    title: 'Media Library',
    description: 'Folder with media assets',
    is_folderish: true,
    parent: STORY_ROOT_ID,
    UID: 'folder-1',
    review_state: 'published',
  },
  {
    '@id': `${STORY_ROOT_ID}/media/launch-video`,
    '@type': 'Video',
    title: 'Launch Video',
    description: 'Teaser for the new release',
    parent: `${STORY_ROOT_ID}/media`,
    UID: 'video-1',
    review_state: 'pending',
  },
  {
    '@id': `${STORY_ROOT_ID}/media/product-image`,
    '@type': 'Image',
    title: 'Product Image',
    description: 'High resolution product image',
    parent: `${STORY_ROOT_ID}/media`,
    UID: 'image-1',
    review_state: 'published',
  },
  {
    '@id': `${STORY_ROOT_ID}/events`,
    '@type': 'Folder',
    title: 'Events',
    description: 'Upcoming events and sprints',
    is_folderish: true,
    parent: STORY_ROOT_ID,
    UID: 'folder-2',
    review_state: 'published',
  },
  {
    '@id': `${STORY_ROOT_ID}/events/community-sprint`,
    '@type': 'Event',
    title: 'Community Sprint',
    description: 'Sprint happening next week',
    parent: `${STORY_ROOT_ID}/events`,
    UID: 'event-1',
    review_state: 'private',
  },
  {
    '@id': `${STORY_ROOT_ID}/policies`,
    '@type': 'Document',
    title: 'Editorial Guidelines',
    description: 'How to publish content',
    parent: STORY_ROOT_ID,
    UID: 'doc-2',
    review_state: 'published',
  },
];

const NODE_MAP = new Map(MOCK_NODES.map((node) => [node['@id'], node]));

const getChildrenFor = (path: string) =>
  MOCK_NODES.filter((node) => node.parent === path);

const buildBreadcrumbs = (path: string) => {
  if (!path || path === STORY_ROOT_ID) {
    const root = NODE_MAP.get(STORY_ROOT_ID);
    return root ? [{ '@id': root['@id'], title: root.title }] : [];
  }

  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: { '@id': string; title: string }[] = [];
  let current = '';

  segments.forEach((segment) => {
    current += `/${segment}`;
    const match = NODE_MAP.get(current);
    if (match) {
      breadcrumbs.push({ '@id': match['@id'], title: match.title });
    }
  });

  return breadcrumbs;
};

const mockObjectBrowserLoader = ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url, 'http://localhost');
  const searchTerm =
    url.searchParams.get('SearchableText')?.toLowerCase() ?? '';
  const isSearch = Boolean(searchTerm);
  const pathParam = params.path ? `/${params.path}` : STORY_ROOT_ID;

  const items = isSearch
    ? MOCK_NODES.filter(
        (node) =>
          node['@id'] !== STORY_ROOT_ID &&
          node.title.toLowerCase().includes(searchTerm),
      )
    : getChildrenFor(pathParam);

  return {
    results: {
      items: items.map(({ parent, ...node }) => node),
    },
    breadcrumbs: {
      items: buildBreadcrumbs(isSearch ? STORY_ROOT_ID : pathParam),
    },
  };
};

const createObjectBrowserRouter = (props: ObjectBrowserWidgetStoryProps) =>
  createMemoryRouter(
    [
      {
        id: 'root',
        path: '/',
        loader: () => ({
          content: {
            '@id': STORY_ROOT_ID,
          },
        }),
        element: (
          <I18nextProvider i18n={storyI18n as any}>
            <div className="min-h-screen bg-quanta-air p-8">
              <div className="max-w-lg">
                <ObjectBrowserWidget {...(props as any)} />
              </div>
            </div>
          </I18nextProvider>
        ),
      },
      {
        path: '@objectBrowserWidget',
        loader: mockObjectBrowserLoader,
      },
      {
        path: '@objectBrowserWidget/:path*',
        loader: mockObjectBrowserLoader,
      },
    ],
    {
      initialEntries: ['/'],
    },
  );

const StoryRouter = (props: ObjectBrowserWidgetStoryProps) => {
  const router = useMemo(() => createObjectBrowserRouter(props), [props]);
  return <RouterProvider router={router} />;
};

const meta = {
  component: ObjectBrowserWidget,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
  tags: ['autodocs'],
  args: {
    label: 'Related items',
    description: 'Select content to feature on the page.',
    title: 'Select Content',
  },
} satisfies Meta<ObjectBrowserWidgetStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
};

export const WithInitialSelection: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    defaultValue: [
      {
        '@id': `${STORY_ROOT_ID}/welcome-document`,
        title: 'Welcome Document',
        '@type': 'Document',
      },
      {
        '@id': `${STORY_ROOT_ID}/media/launch-video`,
        title: 'Launch Video',
        '@type': 'Video',
      },
    ],
  },
};
