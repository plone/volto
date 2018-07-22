import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';

import { Icon } from '../../components';

import boldSVG from '../../icons/bold.svg';
import italicSVG from '../../icons/italic.svg';
import textSVG from '../../icons/text.svg';
import subtextSVG from '../../icons/subtext.svg';
import unorderedListSVG from '../../icons/list-bullet.svg';
import orderedListSVG from '../../icons/list-numbered.svg';
import blockquoteSVG from '../../icons/quote.svg';
import calloutSVG from '../../icons/megaphone.svg';

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

export {
  BlockquoteButton,
  BoldButton,
  CalloutButton,
  ItalicButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  OrderedListButton,
  UnorderedListButton,
};
