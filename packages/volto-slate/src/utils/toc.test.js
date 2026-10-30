import { getAnchor, getAnchorText, slugAnchor } from './toc';

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

describe('getAnchorText', () => {
  it('returns the text of a leaf', () => {
    expect(getAnchorText({ text: 'Hello' })).toBe('Hello');
  });

  it('does not add whitespace between the leafs of a node', () => {
    expect(getAnchorText(partiallyItalicWordHeading)).toBe(
      'Subtitle 3: not okay',
    );
  });

  it('includes the text of inline elements', () => {
    expect(getAnchorText(linkHeading)).toBe('Subtitle 4: Everything is okay');
  });

  it('collapses the inner whitespace and trims the outer one', () => {
    expect(
      getAnchorText({
        type: 'h2',
        children: [{ text: '  Some  ' }, { text: '' }, { text: 'heading ' }],
      }),
    ).toBe('Some heading');
  });

  it('returns an empty string when there is no node', () => {
    expect(getAnchorText(undefined)).toBe('');
  });

  it('returns an empty string for an empty node', () => {
    expect(getAnchorText({})).toBe('');
  });

  it('returns an empty string for a heading with no children', () => {
    expect(getAnchorText({ type: 'h2' })).toBe('');
  });

  it('returns an empty string for a heading with an empty children array', () => {
    expect(getAnchorText({ type: 'h2', children: [] })).toBe('');
  });
});

describe('slugAnchor', () => {
  it('slugs the given text', () => {
    expect(slugAnchor('Subtitle 1: everything is okay')).toBe(
      'subtitle-1-everything-is-okay',
    );
  });

  it('normalizes the diacritics of the given text', () => {
    expect(slugAnchor('Título 2: ação')).toBe('titulo-2-acao');
  });

  it('builds the same anchor as getAnchor does for a node', () => {
    expect(slugAnchor(getAnchorText(linkHeading))).toBe(getAnchor(linkHeading));
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
