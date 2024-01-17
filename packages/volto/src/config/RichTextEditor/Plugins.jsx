import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';

import Styles from './Styles';

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

const plugins = (props) => {
  const { draftJsInlineToolbarPlugin, draftJsBlockBreakoutPlugin } = props;
  const { Separator } = draftJsInlineToolbarPlugin;
  const blockBreakoutPlugin =
    draftJsBlockBreakoutPlugin.default(breakOutOptions);

  const linkPlugin = createLinkPlugin({ libraries: props });

  const buttons = Styles(props);
  const {
    BoldButton,
    ItalicButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CalloutButton,
  } = buttons;

  const inlineToolbarButtons = [
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
