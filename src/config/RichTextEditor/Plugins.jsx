import React from 'react';
import { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  BlockquoteButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createLinkPlugin from '../../components/manage/AnchorPlugin';

const breakOutOptions = {
  doubleBreakoutBlocks: [
    'unordered-list-item',
    'ordered-list-item',
    'code-block',
    'arrowList',
    'checkmarksList',
  ],
  breakoutBlocks: [
    'header-one',
    'header-two',
    'highlight',
    'blockquote',
    'callout',
  ],
};

const blockBreakoutPlugin = createBlockBreakoutPlugin(breakOutOptions);
const linkPlugin = createLinkPlugin();

const CalloutButton = createBlockStyleButton({
  blockType: 'callout',
  children: <span>!</span>,
});

const ArrowListButton = createBlockStyleButton({
  blockType: 'arrowList',
  children: <span>AL</span>,
});

const CheckMarksListButton = createBlockStyleButton({
  blockType: 'checkmarksList',
  children: <span>CL</span>,
});

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
  ArrowListButton,
  CheckMarksListButton,
];

const plugins = [linkPlugin, blockBreakoutPlugin];

export default plugins;
