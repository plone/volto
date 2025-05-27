import { Breadcrumbs } from '@plone/components/tailwind';
import React from 'react';
import type { ObjectBrowserWidgetMode } from './utils';

interface ObjectBrowserWidgetBodyProps
  extends Pick<React.ComponentProps<typeof Breadcrumbs>, 'root'> {
  mode: ObjectBrowserWidgetMode;
}

export function ObjectBrowserWidgetBody({
  mode,
  root,
}: ObjectBrowserWidgetBodyProps) {
  return (
    <div>
      <Breadcrumbs root={root} />
    </div>
  );
}
