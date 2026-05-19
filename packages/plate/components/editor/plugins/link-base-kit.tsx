import { BaseLinkPlugin } from '@platejs/link';

import { LinkElementStatic } from '../../ui/link-node-static';
import { LegacyLinkPlugin } from './legacy-link-plugin';

export const BaseLinkKit = [
  ...LegacyLinkPlugin,
  BaseLinkPlugin.withComponent(LinkElementStatic),
];
