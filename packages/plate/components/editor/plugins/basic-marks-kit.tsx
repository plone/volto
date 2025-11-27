import {
  BoldPlugin,
  CodePlugin,
  HighlightPlugin,
  ItalicPlugin,
  KbdPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';

import { CodeLeaf } from '../../ui/code-node';
import { HighlightLeaf } from '../../ui/highlight-node';
import { KbdLeaf } from '../../ui/kbd-node';
import { LegacyBoldPlugin } from './legacy-bold-plugin';
import { LegacyItalicPlugin } from './legacy-italic-plugin';
import { LegacyStrikethroughPlugin } from './legacy-strikethrough-plugin';

export const BasicMarksKit = [
  ...LegacyBoldPlugin,
  ...LegacyItalicPlugin,
  ...LegacyStrikethroughPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  CodePlugin.configure({
    node: { component: CodeLeaf },
    shortcuts: { toggle: { keys: 'mod+e' } },
  }),
  StrikethroughPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+shift+x' } },
  }),
  SubscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+comma' } },
  }),
  SuperscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+period' } },
  }),
  HighlightPlugin.configure({
    node: { component: HighlightLeaf },
    shortcuts: { toggle: { keys: 'mod+shift+h' } },
  }),
  KbdPlugin.withComponent(KbdLeaf),
];
