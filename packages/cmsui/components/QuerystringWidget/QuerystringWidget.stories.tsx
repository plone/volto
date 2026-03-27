import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RouterProvider,
  createMemoryRouter,
  type LoaderFunctionArgs,
} from 'react-router';
import type { QuerystringValue } from './QuerystringWidgetContext';
import { QuerystringWidget } from './QuerystringWidget';

interface QuerystringWidgetStoryProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  value?: QuerystringValue;
  onChange?: (value: QuerystringValue) => void;
}

const createQuerystringLoader = () => {
  return ({ request }: LoaderFunctionArgs) => {
    return {
      content: {
        '@id': '/Test/Document',
      },
    };
  };
};

const createQuerystringRouter = (props: QuerystringWidgetStoryProps) =>
  createMemoryRouter(
    [
      {
        id: 'root',
        path: '/',
        loader: createQuerystringLoader(),
        element: (
          <div className="min-h-screen bg-white p-8">
            <div className="max-w-2xl">
              <QuerystringWidget {...(props as any)} />
            </div>
          </div>
        ),
      },
      {
        path: '/@queryStringOptions',
        loader: () => ({
          indexes: {
            Creator: {
              title: 'Creator',
              description: 'The person that created an item',
              enabled: true,
              sortable: true,
              group: 'Metadata',
              operators: {
                is: { title: 'Is', description: null, widget: null },
              },
            },
            Title: {
              title: 'Title',
              description: "Text search of an item's title",
              enabled: true,
              sortable: false,
              group: 'Text',
              operators: {
                has: { title: 'Contains', description: null, widget: null },
              },
            },
            Subject: {
              title: 'Tag',
              description: 'Tags are used for organization of content',
              enabled: true,
              sortable: false,
              group: 'Text',
              operators: {
                is: { title: 'Is', description: null, widget: null },
              },
            },
            path: {
              title: 'Location',
              description: 'The location of an item',
              enabled: true,
              sortable: false,
              group: 'Metadata',
              operators: {
                is: {
                  title: 'Navigation path',
                  description: null,
                  widget: null,
                },
              },
            },
            modified: {
              title: 'Modification date',
              description: 'The time and date an item was last modified',
              enabled: true,
              sortable: true,
              group: 'Dates',
              operators: {
                before: {
                  title: 'Before date',
                  description: null,
                  widget: null,
                },
                after: { title: 'After date', description: null, widget: null },
              },
            },
            created: {
              title: 'Creation date',
              description: 'The date an item was created',
              enabled: true,
              sortable: true,
              group: 'Dates',
              operators: {
                before: {
                  title: 'Before date',
                  description: null,
                  widget: null,
                },
                after: { title: 'After date', description: null, widget: null },
              },
            },
            review_state: {
              title: 'Review state',
              description: "An item's workflow state (e.g.published)",
              enabled: true,
              sortable: true,
              group: 'Metadata',
              operators: {
                is: { title: 'Is', description: null, widget: null },
              },
              values: {
                published: { title: 'Published' },
                pending: { title: 'Pending review' },
                private: { title: 'Private' },
              },
            },
            portal_type: {
              title: 'Type',
              description: "An item's type (e.g. Event)",
              enabled: true,
              sortable: false,
              group: 'Metadata',
              operators: {
                is: { title: 'Is', description: null, widget: null },
              },
              values: {
                Document: { title: 'Page' },
                Folder: { title: 'Folder' },
                Image: { title: 'Image' },
                File: { title: 'File' },
                Event: { title: 'Event' },
              },
            },
          },
        }),
      },
    ],
    {
      initialEntries: ['/'],
    },
  );

const StoryRouter = (props: QuerystringWidgetStoryProps) => {
  const router = useMemo(() => createQuerystringRouter(props), [props]);
  return <RouterProvider router={router} />;
};

const meta = {
  component: QuerystringWidget,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
  tags: ['autodocs'],
  args: {
    label: 'Search Criteria',
    description: 'Define search criteria to filter content',
  },
} satisfies Meta<QuerystringWidgetStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state of the QuerystringWidget with no criteria
 */
export const Default: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
};

/**
 * QuerystringWidget with a single criterion
 */
export const WithSingleCriterion: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    value: {
      query: [
        {
          i: 'Creator',
          o: 'is',
          v: 'admin',
        },
      ],
      sort_on: 'Title',
      sort_order: 'ascending',
      limit: 100,
      b_size: 50,
    } as QuerystringValue,
  },
};

/**
 * QuerystringWidget with multiple criteria
 */
export const WithMultipleCriteria: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    value: {
      query: [
        {
          i: 'Creator',
          o: 'is',
          v: 'admin',
        },
        {
          i: 'Title',
          o: 'has',
          v: 'Document',
        },
        {
          i: 'modified',
          o: 'before',
          v: '2024-12-31',
        },
      ],
      sort_on: 'modified',
      sort_order: 'descending',
      limit: 50,
      b_size: 25,
    } as QuerystringValue,
  },
};

/**
 * QuerystringWidget with path criterion (shows depth field)
 */
export const WithPathCriterionAndDepth: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    value: {
      query: [
        {
          i: 'path',
          o: 'is',
          v: '/Test/Folder',
        },
        {
          i: 'review_state',
          o: 'is',
          v: 'published',
        },
      ],
      depth: 2,
      sort_on: 'Title',
      sort_order: 'ascending',
      limit: 100,
      b_size: 50,
    } as QuerystringValue,
  },
};

/**
 * QuerystringWidget in error state
 */
export const WithError: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    label: 'Search Criteria',
    description: 'Define search criteria to filter content',
    errorMessage: 'Please check your search criteria',
    value: {
      query: [
        {
          i: 'Creator',
          o: 'is',
          v: '',
        },
      ],
    } as QuerystringValue,
  },
};

/**
 * QuerystringWidget with all options configured
 */
export const FullyConfigured: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    label: 'Advanced Search',
    description:
      'Build complex search queries by adding multiple criteria. Criteria are combined with AND logic.',
    value: {
      query: [
        {
          i: 'Title',
          o: 'has',
          v: 'news',
        },
        {
          i: 'Creator',
          o: 'is',
          v: 'site_owner',
        },
        {
          i: 'modified',
          o: 'after',
          v: '2024-01-01',
        },
        {
          i: 'review_state',
          o: 'is',
          v: 'published',
        },
      ],
      sort_on: 'modified',
      sort_order: 'descending',
      limit: 200,
      b_size: 25,
    } as QuerystringValue,
  },
};

/**
 * QuerystringWidget with complex date-based criteria
 */
export const WithDateCriteria: Story = {
  render: (args) => <StoryRouter {...(args as any)} />,
  args: {
    label: 'Date-based Search',
    description: 'Filter content by creation and modification dates',
    value: {
      query: [
        {
          i: 'created',
          o: 'after',
          v: '2024-01-01',
        },
        {
          i: 'modified',
          o: 'before',
          v: '2024-12-31',
        },
      ],
      sort_on: 'created',
      sort_order: 'descending',
      limit: 50,
      b_size: 10,
    } as QuerystringValue,
  },
};
