import { Separator } from 'draft-js-inline-toolbar-plugin';

import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';
//import createLinkDetectionPlugin from '@plone/volto/components/manage/LinkDetectionPlugin/link-detection-plugin';

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
const linkPlugin = createLinkPlugin();
//const linkDetectionPlugin = createLinkDetectionPlugin();

export const inlineToolbarButtons = [
  BoldButton,
  ItalicButton,
  linkPlugin.LinkButton,
  Separator,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CalloutButton,
];

const plugins = [linkPlugin, blockBreakoutPlugin]; //linkDetectionPlugin

export default plugins;
