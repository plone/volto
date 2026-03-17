import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '../../ui/link-node';
import { LinkFloatingToolbar } from '../../ui/link-toolbar';
import { LegacyLinkPlugin } from './legacy-link-plugin';

export const LinkKit = [
  ...LegacyLinkPlugin,
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
