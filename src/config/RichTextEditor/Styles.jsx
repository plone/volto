import React from 'react';
// import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
// import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';

import Icon from '@plone/volto/components/theme/Icon/Icon';

import boldSVG from '@plone/volto/icons/bold.svg';
import italicSVG from '@plone/volto/icons/italic.svg';
import textSVG from '@plone/volto/icons/text.svg';
import subtextSVG from '@plone/volto/icons/subtext.svg';
import unorderedListSVG from '@plone/volto/icons/list-bullet.svg';
import orderedListSVG from '@plone/volto/icons/list-numbered.svg';
import blockquoteSVG from '@plone/volto/icons/quote.svg';
import calloutSVG from '@plone/volto/icons/megaphone.svg';

export default function Styles(props) {
  const createInlineStyleButton = props.draftJsCreateInlineStyleButton.default;
  const createBlockStyleButton = props.draftJsCreateBlockStyleButton.default;

  const BoldButton = createInlineStyleButton({
    style: 'BOLD',
    children: <Icon name={boldSVG} size="24px" />,
  });

  const ItalicButton = createInlineStyleButton({
    style: 'ITALIC',
    children: <Icon name={italicSVG} size="24px" />,
  });

  const HeadlineTwoButton = createBlockStyleButton({
    blockType: 'header-two',
    children: <Icon name={textSVG} size="24px" />,
  });

  const HeadlineThreeButton = createBlockStyleButton({
    blockType: 'header-three',
    children: <Icon name={subtextSVG} size="24px" />,
  });

  const UnorderedListButton = createBlockStyleButton({
    blockType: 'unordered-list-item',
    children: <Icon name={unorderedListSVG} size="24px" />,
  });

  const OrderedListButton = createBlockStyleButton({
    blockType: 'ordered-list-item',
    children: <Icon name={orderedListSVG} size="24px" />,
  });

  const BlockquoteButton = createBlockStyleButton({
    blockType: 'blockquote',
    children: <Icon name={blockquoteSVG} size="24px" />,
  });

  const CalloutButton = createBlockStyleButton({
    blockType: 'callout',
    children: <Icon name={calloutSVG} size="24px" />,
  });
  return {
    BlockquoteButton,
    BoldButton,
    CalloutButton,
    ItalicButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    OrderedListButton,
    UnorderedListButton,
  };
}
