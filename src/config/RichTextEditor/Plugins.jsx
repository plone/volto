import { Separator } from 'draft-js-inline-toolbar-plugin';

import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';

import {
  BlockquoteButton,
  BoldButton,
  CalloutButton,
  ItalicButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  OrderedListButton,
  UnorderedListButton,
} from './Styles';

const breakOutOptions = {
  doubleBreakoutBlocks: [
    'unordered-list-item',
    'ordered-list-item',
    'code-block',
  ],
  breakoutBlocks: [
    'header-one',
    'header-two',
    'header-three',
    'highlight',
    'blockquote',
    'callout',
  ],
};

const blockBreakoutPlugin = createBlockBreakoutPlugin(breakOutOptions);

export const inlineToolbarButtons = [
  BoldButton,
  ItalicButton,
  Separator,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CalloutButton,
];

const plugins = [blockBreakoutPlugin];

export default plugins;
