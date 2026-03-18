import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RouterProvider,
  createMemoryRouter,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from 'react-router';
import { I18nextProvider } from 'react-i18next';
import ImageWidget from './ImageWidget';

type ImageWidgetStoryProps = React.ComponentProps<typeof ImageWidget>;

type MockNode = {
  '@id': string;
  '@type': string;
  title: string;
  is_folderish?: boolean;
  parent?: string;
};

const STORY_ROOT_ID = '/storybook-root';

const MOCK_NODES: MockNode[] = [
  {
    '@id': STORY_ROOT_ID,
    '@type': 'Folder',
    title: 'Storybook Site Root',
    is_folderish: true,
  },
  {
    '@id': `${STORY_ROOT_ID}/media`,
    '@type': 'Folder',
    title: 'Media Library',
    is_folderish: true,
    parent: STORY_ROOT_ID,
  },
  {
    '@id': `${STORY_ROOT_ID}/media/sunrise`,
    '@type': 'Image',
    title: 'Sunrise',
    parent: `${STORY_ROOT_ID}/media`,
  },
  {
    '@id': `${STORY_ROOT_ID}/media/forest`,
    '@type': 'Image',
    title: 'Forest',
    parent: `${STORY_ROOT_ID}/media`,
  },
  {
    '@id': `image-widget/halfdome2022.jpg`,
    '@type': 'Image',
    title: 'Hero Image',
    parent: STORY_ROOT_ID,
  },
  {
    '@id': `${STORY_ROOT_ID}/page`,
    '@type': 'Document',
    title: 'A Page',
    parent: STORY_ROOT_ID,
  },
];

const NODE_MAP = new Map(MOCK_NODES.map((node) => [node['@id'], node]));

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
    url.searchParams.get('SearchableText')?.toLocaleLowerCase() ?? '';
  const isSearch = Boolean(searchTerm);
  const pathParam = params.path ? `/${params.path}` : STORY_ROOT_ID;

  const items = isSearch
    ? MOCK_NODES.filter(
        (node) =>
          node['@id'] !== STORY_ROOT_ID &&
          node.title.toLocaleLowerCase().includes(searchTerm),
      )
    : getChildrenFor(pathParam);

  return {
    results: {
      items,
    },
    breadcrumbs: {
      items: buildBreadcrumbs(isSearch ? STORY_ROOT_ID : pathParam),
    },
  };
};

const mockCreateContentAction = async ({
  request,
}: ActionFunctionArgs): Promise<{ '@id': string; title: string }> => {
  const body = (await request.json()) as {
    path?: string;
    data?: { title?: string };
  };

  const path = body.path || STORY_ROOT_ID;
  const title = body.data?.title || 'uploaded-image.jpg';
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    '@id': `${path}/${id}`,
    title,
  };
};

function StoryImageWidget(props: ImageWidgetStoryProps) {
  const [value, setValue] = useState<string | null>(
    typeof props.value === 'string'
      ? props.value
      : typeof props.defaultValue === 'string'
        ? props.defaultValue
        : null,
  );

  return (
    <ImageWidget
      {...props}
      value={value}
      onChange={(nextValue, extras) => {
        setValue(nextValue);
        props.onChange?.(nextValue, extras);
      }}
    />
  );
}

const createImageWidgetRouter = (props: ImageWidgetStoryProps) =>
  createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <I18nextProvider i18n={storyI18n as any}>
            <div className="min-h-screen bg-quanta-air p-8">
              <div className="max-w-2xl">
                <StoryImageWidget {...props} />
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
      {
        path: '@createContent',
        action: mockCreateContentAction,
      },
      {
        path: '@createContent/*',
        action: mockCreateContentAction,
      },
    ],
    {
      initialEntries: ['/'],
    },
  );

function StoryRouter(props: ImageWidgetStoryProps) {
  const router = useMemo(() => createImageWidgetRouter(props), [props]);
  return <RouterProvider router={router} />;
}

const meta = {
  component: ImageWidget,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
  tags: ['autodocs'],
  args: {
    label: 'Image',
    description: 'Pick from site, upload from computer, or set an external URL',
    imageSize: 'teaser',
    objectBrowserPickerType: 'image',
    value: null,
    currentPath: STORY_ROOT_ID,
  },
} satisfies Meta<ImageWidgetStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <StoryRouter {...args} />,
};

export const WithPresetImage: Story = {
  render: (args) => <StoryRouter {...args} />,
  args: {
    value: 'image-widget/halfdome2022.jpg',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <StoryRouter {...args} />,
  args: {
    value: undefined,
    defaultValue: 'image-widget/halfdome2022.jpg',
  },
};

export const UrlOnly: Story = {
  render: (args) => <StoryRouter {...args} />,
  args: {
    hideObjectBrowserPicker: true,
    restrictFileUpload: true,
  },
};
