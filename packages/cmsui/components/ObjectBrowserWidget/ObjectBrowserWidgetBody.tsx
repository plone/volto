import {
  Breadcrumb,
  Breadcrumbs,
  Button,
  GridList,
  GridListItem,
} from '@plone/components/tailwind';
import React, { useState } from 'react';
import { isImageMode, type ObjectBrowserWidgetMode } from './utils';
import {
  ChevronrightIcon,
  ListIcon,
} from '../../../components/src/components/icons';
import { useFetcher } from 'react-router';

export interface ObjectBrowserWidgetBodyProps
  extends Pick<React.ComponentProps<typeof Breadcrumbs>, 'root' | 'items'> {
  mode: ObjectBrowserWidgetMode;
}
const mock = [
  { '@id': '/folder', title: 'Folder' },
  { '@id': '/folder/page', title: 'Page' },
];
const mockList = [
  { '@id': '/folder', title: 'Folder' },
  { '@id': '/folder2', title: 'Folder2' },
  { '@id': '/folder3', title: 'Folder3' },
  { '@id': '/folder4', title: 'Folder4' },
  { '@id': '/folder5', title: 'Folder5' },
  { '@id': '/folder6', title: 'Folder6' },
  { '@id': '/folder7', title: 'Folder7' },
  { '@id': '/folder8', title: 'Folder8' },
];

export function ObjectBrowserWidgetBody({
  mode,
  root = '/',
  items = mock,
}: ObjectBrowserWidgetBodyProps) {
  // const [context, setContext] = useState(root);
  const fetcher = useFetcher();
  console.log(fetcher.data);
  return (
    <div className="items-between flex flex-col justify-center py-4">
      <div className="flex items-center justify-between space-y-1">
        <Breadcrumbs
          root={root}
          // This has to be linked to current context/path
          items={mock}
          includeRoot
        >
          {(item) => (
            <Breadcrumb
              id={item['@id']}
              onPress={(e) => {
                console.log(
                  'Ill need to request search items for ',
                  e.target.id,
                );
                // setContext(e.target.id);
              }}
            >
              {item.title}
            </Breadcrumb>
          )}
        </Breadcrumbs>
        <Button onPress={() => console.log('Change view type')}>
          <ListIcon />
        </Button>
      </div>
      <GridList
        selectionMode={isImageMode(mode) ? 'single' : 'multiple'}
        selectionBehavior={isImageMode(mode) ? 'replace' : 'toggle'}
        items={mockList}
        className="rounded-none border-0 py-4"
        onAction={(key) =>
          // alert(`Will call search and change context to ${key}...`)
          fetcher.load('/@search')
        }
      >
        {(item) => (
          <GridListItem
            id={item['@id']}
            className="border-b-quanta-silver rounded-none border-b-2 first:rounded-t-none last:rounded-b-none"
          >
            <div className="text-quanta-cobalt flex w-full items-center justify-between">
              {item.title}
              <Button variant="neutral">
                <ChevronrightIcon />
              </Button>
            </div>
          </GridListItem>
        )}
      </GridList>
    </div>
  );
}
