import { Breadcrumb, Breadcrumbs } from '@plone/components/tailwind';
import React from 'react';
import type { ObjectBrowserWidgetMode } from './utils';
import { HomeIcon } from '../../../components/src/components/icons';
import { atom, useAtom } from 'jotai';

const contextStateAtom = atom('/');

export interface ObjectBrowserWidgetBodyProps
  extends Pick<React.ComponentProps<typeof Breadcrumbs>, 'root' | 'items'> {
  mode: ObjectBrowserWidgetMode;
}

export function ObjectBrowserWidgetBody({
  mode,
  root,
  items,
}: ObjectBrowserWidgetBodyProps) {
  const [context, setContext] = useAtom(contextStateAtom);
  return (
    <div>
      <Breadcrumbs
        root={root}
        items={items}
        homeIcon={<HomeIcon size="sm" />}
        includeRoot
      >
        {(item) => (
          <Breadcrumb id={item['@id']} href={item['@id']}>
            {item.title}
          </Breadcrumb>
        )}
      </Breadcrumbs>
    </div>
  );
}
