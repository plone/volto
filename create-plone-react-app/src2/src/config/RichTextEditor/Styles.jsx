import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';

import { Icon } from '@plone/plone-react/components';

import boldSVG from '@plone/plone-react/icons/bold.svg';
import italicSVG from '@plone/plone-react/icons/italic.svg';
import textSVG from '@plone/plone-react/icons/text.svg';
import subtextSVG from '@plone/plone-react/icons/subtext.svg';
import unorderedListSVG from '@plone/plone-react/icons/list-bullet.svg';
import orderedListSVG from '@plone/plone-react/icons/list-numbered.svg';
import blockquoteSVG from '@plone/plone-react/icons/quote.svg';
import calloutSVG from '@plone/plone-react/icons/megaphone.svg';

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
