declare module '*.svg?react' {
  import * as React from 'react';
  import type { IconPropsWithoutChildren } from '@plone/components';
  const ReactComponent: React.FunctionComponent<IconPropsWithoutChildren>;

  export default ReactComponent;
}
