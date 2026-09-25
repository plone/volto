import { getAnchor, getAnchorText, serializeNodeToInlineText } from './toc';

const plainHeading = {
  type: 'h2',
  children: [{ text: 'Subtitle 1: Everything is okay' }],
};

const italicHeading = {
  type: 'h2',
  children: [
    { text: 'Subtitle 2: Everything is ' },
    { text: 'not', italic: true },
    { text: ' okay' },
  ],
};

const partiallyItalicWordHeading = {
  type: 'h2',
  children: [
    { text: 'Subtitle 3: n' },
    { text: 'o', italic: true },
    { text: 't okay' },
  ],
};

const linkHeading = {
  type: 'h2',
  children: [
    { text: 'Subtitle 4: Everything is ' },
    {
      type: 'link',
      data: { url: '/some-page' },
      children: [{ text: 'okay' }],
    },
    { text: '' },
  ],
};

describe('serializeNodeToInlineText', () => {
  it('returns the text of a node without a type', () => {
    expect(serializeNodeToInlineText({ text: 'Hello' })).toBe('Hello');
  });

  it('does not add whitespace between the leafs of a node', () => {
    expect(serializeNodeToInlineText(partiallyItalicWordHeading)).toBe(
      'Subtitle 3: not okay',
    );
  });

  it('includes the text of inline elements', () => {
    expect(serializeNodeToInlineText(linkHeading)).toBe(
      'Subtitle 4: Everything is okay',
    );
  });

  it('returns an empty string for an empty node', () => {
    expect(serializeNodeToInlineText(undefined)).toBe('');
    expect(serializeNodeToInlineText({ type: 'h2' })).toBe('');
  });
});

describe('getAnchorText', () => {
  it('collapses the inner whitespace and trims the outer one', () => {
    expect(
      getAnchorText({
        type: 'h2',
        children: [{ text: '  Some  ' }, { text: '' }, { text: 'heading ' }],
      }),
    ).toBe('Some heading');
  });
});

describe('getAnchor', () => {
  it('slugs a heading', () => {
    expect(getAnchor(plainHeading)).toBe('subtitle-1-everything-is-okay');
  });

  it('is not affected by inline formatting', () => {
    expect(getAnchor(italicHeading)).toBe('subtitle-2-everything-is-not-okay');
    expect(getAnchor(partiallyItalicWordHeading)).toBe('subtitle-3-not-okay');
  });

  it('is not affected by inline links', () => {
    expect(getAnchor(linkHeading)).toBe('subtitle-4-everything-is-okay');
  });

  it('returns an empty string for an empty heading', () => {
    expect(getAnchor({ type: 'h2', children: [{ text: '' }] })).toBe('');
  });
});
