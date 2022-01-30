import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';

// import { Separator } from 'draft-js-inline-toolbar-plugin';
// import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
// import createLinkDetectionPlugin from '@plone/volto/components/manage/LinkDetectionPlugin/link-detection-plugin';

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

//const linkDetectionPlugin = createLinkDetectionPlugin();

const plugins = ({
  draftJsInlineToolbarPlugin,
  draftJsBlockBreakoutPlugin,
}) => {
  const { Separator } = draftJsInlineToolbarPlugin;
  const blockBreakoutPlugin = draftJsBlockBreakoutPlugin(breakOutOptions);
  const linkPlugin = createLinkPlugin();

  const inlineToolbarButtons = () => [
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
  return { inlineToolbarButtons, plugins: [linkPlugin, blockBreakoutPlugin] }; //linkDetectionPlugin
};

export default plugins;
