import React from 'react';
import renderer from 'react-test-renderer';
import config from '@plone/volto/registry';
import TextBlockView from './TextBlockView';
import { getAnchor } from '@plone/volto-slate/utils/toc';

beforeAll(() => {
  config.settings = {
    slate: {
      topLevelTargetElements: ['h2', 'h3'],
      elements: {
        default: ({ attributes, children }) => (
          <p {...attributes}>{children}</p>
        ),
        h2: ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
        link: ({ attributes, children }) => <a {...attributes}>{children}</a>,
      },
      leafs: {
        italic: ({ children }) => <em>{children}</em>,
      },
    },
  };
});

const getHeadingId = (value) => {
  const component = renderer.create(
    <TextBlockView id="block-id" data={{ value }} />,
  );
  return component.root.findByType('h2').props.id;
};

test('renders the anchor of a plain heading', () => {
  expect(
    getHeadingId([
      { type: 'h2', children: [{ text: 'Subtitle 1: Everything is okay' }] },
    ]),
  ).toBe('subtitle-1-everything-is-okay');
});

test('renders the same anchor for a heading with inline formatting', () => {
  const value = [
    {
      type: 'h2',
      children: [
        { text: 'Subtitle 2: Everything is ' },
        { text: 'not', italic: true },
        { text: ' okay' },
      ],
    },
  ];
  expect(getHeadingId(value)).toBe('subtitle-2-everything-is-not-okay');
  // The table of contents entry of the block links to this anchor.
  expect(getHeadingId(value)).toBe(getAnchor(value[0]));
});

test('renders the same anchor for a heading containing a link', () => {
  const value = [
    {
      type: 'h2',
      children: [
        { text: 'Subtitle 3: Everything is ' },
        {
          type: 'link',
          data: { url: '/some-page' },
          children: [{ text: 'okay' }],
        },
        { text: '' },
      ],
    },
  ];
  expect(getHeadingId(value)).toBe('subtitle-3-everything-is-okay');
  expect(getHeadingId(value)).toBe(getAnchor(value[0]));
});

test('falls back to the block id for an empty heading', () => {
  expect(getHeadingId([{ type: 'h2', children: [{ text: '' }] }])).toBe(
    'block-id',
  );
});
