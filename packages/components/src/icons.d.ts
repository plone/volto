declare module '*.svg?react' {
  import * as React from 'react';
  import type { IconProps } from '@plone/components';
  const ReactComponent: React.FunctionComponent<IconProps>;

  export default ReactComponent;
}
