import { describe, expect, it, vi } from 'vitest';
import { KEYS } from 'platejs';
import type { SlateEditor, Value } from 'platejs';

import {
  migrateLegacyBold,
  migrateLegacyBoldInValue,
} from './legacy-bold-plugin';
import {
  migrateLegacyLink,
  migrateLegacyLinksInValue,
  migrateLegacyLinksInValueStatic,
} from './legacy-link-plugin';
import { normalizeLegacyValue } from './normalize-legacy';

describe('legacy bold migration helpers', () => {
  it('calls transforms to bold text and unwrap strong elements', () => {
    const setNodes = vi.fn();
    const unwrapNodes = vi.fn(
      ({ match }: { match: (node: unknown) => boolean }) => {
        expect(match({ type: 'strong', children: [] })).toBe(true);
        expect(match({ type: 'p', children: [] })).toBe(false);
      },
    );

    const editor = {
      tf: { setNodes, unwrapNodes },
    } as unknown as SlateEditor;

    migrateLegacyBold(editor, [0]);

    expect(setNodes).toHaveBeenCalledTimes(1);
    const [props, options] = setNodes.mock.calls[0]!;
    expect(props).toEqual({ bold: true });
    expect(options?.mode).toBe('all');
    expect(options?.match?.({ text: 'x' })).toBe(true);
    expect(options?.match?.({ type: 'div' })).toBe(false);

    expect(unwrapNodes).toHaveBeenCalledTimes(1);
  });

  it('normalizes inline strong wrappers into bold text, idempotently', () => {
    const value: Value = [
      {
        type: 'p',
        children: [
          { text: 'plain' },
          {
            type: 'strong',
            children: [{ text: 'bold' }],
          },
          {
            type: 'strong',
            children: [
              {
                type: 'span',
                children: [{ text: 'nested' }],
              },
            ],
          },
        ],
      } as any,
    ];

    migrateLegacyBoldInValue(value);

    expect(value).toEqual([
      {
        type: 'p',
        children: [
          { text: 'plain' },
          { text: 'bold', bold: true },
          {
            type: 'span',
            children: [{ text: 'nested', bold: true }],
          },
        ],
      },
    ]);

    migrateLegacyBoldInValue(value);
    expect(value).toEqual([
      {
        type: 'p',
        children: [
          { text: 'plain' },
          { text: 'bold', bold: true },
          {
            type: 'span',
            children: [{ text: 'nested', bold: true }],
          },
        ],
      },
    ]);
  });
});

describe('legacy link migration helpers', () => {
  it('migrates a single legacy link node using editor transforms', () => {
    const setNodes = vi.fn();
    const unsetNodes = vi.fn();
    const editor = {
      getType: () => KEYS.link,
      tf: { setNodes, unsetNodes },
    } as unknown as SlateEditor;

    const node = {
      type: 'link',
      data: { url: 'https://example.com', target: '_blank' },
    } as any;

    migrateLegacyLink(editor, [0], node);

    expect(setNodes).toHaveBeenCalledWith(
      { type: KEYS.link, url: 'https://example.com', target: '_blank' },
      { at: [0] },
    );
    expect(unsetNodes).toHaveBeenCalledWith('data', { at: [0] });
  });

  it('normalizes legacy link shapes in static values', () => {
    const value: Value = [
      {
        type: 'p',
        children: [
          {
            type: 'link',
            data: { url: 'https://a.com', target: '_blank' },
            children: [{ text: 'a' }],
          },
          {
            type: KEYS.link,
            data: { url: 'https://b.com' },
            children: [{ text: 'b' }],
          },
          {
            type: 'link',
            children: [{ text: 'c' }],
          },
        ],
      } as any,
    ];

    migrateLegacyLinksInValueStatic(value);

    expect(value[0]?.children).toEqual([
      {
        type: KEYS.link,
        url: 'https://a.com',
        target: '_blank',
        children: [{ text: 'a' }],
      },
      {
        type: KEYS.link,
        url: 'https://b.com',
        children: [{ text: 'b' }],
      },
      {
        type: KEYS.link,
        children: [{ text: 'c' }],
      },
    ]);
  });

  it('normalizes legacy link shapes using editor-aware migration', () => {
    const value: Value = [
      {
        type: 'p',
        children: [
          {
            type: 'link',
            data: { url: 'https://a.com' },
            children: [{ text: 'link' }],
          },
        ],
      } as any,
    ];

    const editor = {
      getType: () => KEYS.link,
    } as unknown as SlateEditor;

    migrateLegacyLinksInValue(editor, value);

    expect(value[0]?.children?.[0]).toEqual({
      type: KEYS.link,
      url: 'https://a.com',
      children: [{ text: 'link' }],
    });
  });
});

describe('normalizeLegacyValue', () => {
  it('applies bold and link migrations in one pass', () => {
    const value: Value = [
      {
        type: 'p',
        children: [
          {
            type: 'strong',
            children: [{ text: 'bold' }],
          },
          {
            type: 'link',
            data: { url: 'https://example.com' },
            children: [{ text: 'link' }],
          },
        ],
      } as any,
    ];

    normalizeLegacyValue(value);

    expect(value).toEqual([
      {
        type: 'p',
        children: [
          { text: 'bold', bold: true },
          {
            type: KEYS.link,
            url: 'https://example.com',
            children: [{ text: 'link' }],
          },
        ],
      },
    ]);

    normalizeLegacyValue(value);
    expect(value).toEqual([
      {
        type: 'p',
        children: [
          { text: 'bold', bold: true },
          {
            type: KEYS.link,
            url: 'https://example.com',
            children: [{ text: 'link' }],
          },
        ],
      },
    ]);
  });
});
