import { describe, it, expect } from 'vitest';
import { isCursorAtBlockStart } from './selection';

// `isCursorAtBlockStart` only inspects `editor.selection` and `editor.children`,
// so plain editor-shaped objects are enough (no full Volto config registry).
const makeEditor = (children, selection) => ({ children, selection });
const at = (path, offset) => ({ path, offset });
const collapsed = (path, offset) => ({
  anchor: at(path, offset),
  focus: at(path, offset),
});

describe('isCursorAtBlockStart', () => {
  it('returns true when the caret is at the first leaf of the block', () => {
    const editor = makeEditor(
      [{ type: 'p', children: [{ text: 'Hello' }] }],
      collapsed([0, 0], 0),
    );
    expect(isCursorAtBlockStart(editor)).toBe(true);
  });

  it('returns true for the first leaf of a nested list item (path [0,0,0])', () => {
    const editor = makeEditor(
      [
        {
          type: 'ul',
          children: [
            {
              type: 'li',
              children: [{ text: 'first item' }],
            },
          ],
        },
      ],
      collapsed([0, 0, 0], 0),
    );
    expect(isCursorAtBlockStart(editor)).toBe(true);
  });

  it('returns false at offset 0 of a non-first leaf inside a list item (#8347)', () => {
    // A list item: {text:""} + link + {text:""} — the empty text leaf after
    // the link is at path [0,0,2]. Backspace there must NOT count as block start.
    const editor = makeEditor(
      [
        {
          type: 'ul',
          children: [
            {
              type: 'li',
              children: [
                { text: '' },
                {
                  type: 'link',
                  data: { url: 'https://demo.plone.org/' },
                  children: [{ text: 'Plone 6 (this site)' }],
                },
                { text: '' },
              ],
            },
          ],
        },
      ],
      collapsed([0, 0, 2], 0),
    );
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });

  it('returns false at offset 0 of a non-first leaf of a plain paragraph', () => {
    const editor = makeEditor(
      [
        {
          type: 'p',
          children: [
            { text: 'before' },
            {
              type: 'link',
              data: { url: 'https://example.com' },
              children: [{ text: 'link' }],
            },
            { text: 'after' },
          ],
        },
      ],
      collapsed([0, 2], 0),
    );
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });

  it('returns false when the offset is greater than 0', () => {
    const editor = makeEditor(
      [{ type: 'p', children: [{ text: 'Hello' }] }],
      collapsed([0, 0], 2),
    );
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });

  it('returns false when there is no selection', () => {
    const editor = makeEditor(
      [{ type: 'p', children: [{ text: 'Hi' }] }],
      null,
    );
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });

  it('returns false when the selection is expanded', () => {
    const editor = makeEditor([{ type: 'p', children: [{ text: 'Hello' }] }], {
      anchor: at([0, 0], 0),
      focus: at([0, 0], 3),
    });
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });

  it('returns false when the editor has no children', () => {
    const editor = makeEditor([], collapsed([0, 0], 0));
    expect(isCursorAtBlockStart(editor)).toBe(false);
  });
});
