import config from '@plone/volto/registry';

import { JSDOM } from 'jsdom';
import { deserialize } from '@plone/volto-slate/editor/deserialize';
import * as htmlUtils from '@plone/volto-slate/editor/utils';
import { makeEditor } from '@plone/volto-slate/utils/editor';
import installSlate from '@plone/volto-slate/index';

const tojson = (html) => {
  const parsed = new JSDOM(html);
  const document = parsed.window.document;
  const editor = makeEditor();
  const body =
    document.getElementsByTagName('google-sheets-html-origin').length > 0
      ? document.querySelector('google-sheets-html-origin > table')
      : document.body;
  const json = deserialize(editor, body);
  return json;
};

describe('deserialize', () => {
  beforeEach(() => {
    config.blocks.blocksConfig = {
      table: {
        id: 'table',
      },
    };
    installSlate(config);
  });

  it('accepts a DOM element', () => {
    const html = '<p>Hello world</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [
          {
            text: 'Hello world',
          },
        ],
      },
    ]);
  });

  it('two root tags', () => {
    const html = '<p>Hello world</p><p>something</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [
          {
            text: 'Hello world',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'something',
          },
        ],
      },
    ]);
  });

  it('takes inline elements', () => {
    const html = '<strong>hello</strong>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'strong',
        children: [
          {
            text: 'hello',
          },
        ],
      },
    ]);
  });

  it('strips unknown elements', () => {
    const html = '<strong><unk>hello</unk></strong>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'strong',
        children: [{ text: 'hello' }],
      },
    ]);
  });

  it('#1: strips all spaces and tabs immediately before and after a line break', () => {
    const html = '<h1>   Hello \n\t\t\t\t<span> World!</span>\t  </h1>';

    expect(htmlUtils.removeSpaceBeforeAfterEndLine(html)).toBe(
      '<h1>   Hello\n<span> World!</span>\t  </h1>',
    );
  });

  it('#2: convert all tabs to spaces', () => {
    const html = '<h1>   Hello\n<span> World!</span>\t  </h1>';

    expect(htmlUtils.convertTabsToSpaces(html)).toBe(
      '<h1>   Hello\n<span> World!</span>   </h1>',
    );
  });

  it('#3: convert line breaks spaces', () => {
    const html = '<h1>   Hello\n<span> World!</span>   </h1>';

    expect(htmlUtils.convertLineBreaksToSpaces(html)).toBe(
      '<h1>   Hello <span> World!</span>   </h1>',
    );
  });

  it('#4: remove space follows space in sibling text node', () => {
    const html = '<h1>   Hello <span> World!</span>   </h1>';

    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const span = body.querySelector('span');

    expect(htmlUtils.removeSpaceFollowSpace(' World!', span)).toBe('World!');
  });

  it('#4: remove space follows space in sibling inline node', () => {
    const html = '<h1>   <b>Hello </b><span> World!</span>   </h1>';

    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const span = body.querySelector('span');
    const b = body.querySelector('b');

    expect(htmlUtils.removeSpaceFollowSpace('Hello ', b)).toBe('Hello ');
    expect(htmlUtils.removeSpaceFollowSpace(' World!', span)).toBe('World!');
  });

  it('#4: remove space in text node follows space in sibling inline node', () => {
    const html = '<h1>   <b>Hello </b> World!   </h1>';

    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const b = body.querySelector('b');

    const textNode = b.nextSibling;
    expect(textNode.textContent).toBe(' World!   ');

    expect(htmlUtils.removeSpaceFollowSpace(' World!    ', textNode)).toBe(
      'World! ',
    );
  });

  it('#5. Remove space at beginning of element', () => {
    const html = '<h1> Hello <b>World!</b> </h1>';

    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const h1 = body.querySelector('h1');

    const textNode = h1.firstChild;
    expect(textNode.textContent).toBe(' Hello ');

    expect(htmlUtils.removeElementEdges(' Hello ', textNode)).toBe('Hello ');
  });

  it('#5. Remove space at end of element', () => {
    const html = '<h1> Hello <b>World!</b> </h1>';

    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const h1 = body.querySelector('h1');

    const textNode = h1.lastChild;
    expect(textNode.textContent).toBe(' ');

    expect(htmlUtils.removeElementEdges(' ', textNode)).toBe('');
  });

  it('collapses multiple consecutive spaces', () => {
    const html = '<strong>hello  world</strong>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'strong',
        children: [{ text: 'hello world' }],
      },
    ]);
  });

  it('preserves spaces between two inline nodes', () => {
    const html = '<i>hello</i>    <i>world</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello' }],
      },
      { text: ' ' },
      {
        type: 'i',
        children: [{ text: 'world' }],
      },
    ]);
  });

  it('preserves spaces between one block and one inline node', () => {
    const html = '<p>hello</p>    <i>world</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [{ text: 'hello' }],
      },
      { text: ' ' },
      {
        type: 'i',
        children: [{ text: 'world' }],
      },
    ]);
  });

  it('preserves spaces between one inline node and one block node', () => {
    const html = '<i>hello</i>    <p>world</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello' }],
      },
      { text: ' ' },
      {
        type: 'p',
        children: [{ text: 'world' }],
      },
    ]);
  });

  it('replaces a single newline inside text with a space', () => {
    const html = '<i>hello\nworld</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello world' }],
      },
    ]);
  });

  it('replaces multiple newlines inside text with a space', () => {
    const html = '<i>hello\n\n\nworld</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello world' }],
      },
    ]);
  });

  it('removes whitespace between block elements', () => {
    const html = '<p>hello</p>\n   \n<p>world</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [{ text: 'hello' }],
      },
      {
        type: 'p',
        children: [{ text: 'world' }],
      },
    ]);
  });

  it('transforms newlines at beginning of tags to space', () => {
    const html = '<b>hello</b><i>\nworld</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'b',
        children: [{ text: 'hello' }],
      },
      {
        type: 'i',
        children: [{ text: ' world' }],
      },
    ]);
  });

  it('transforms newlines after a space', () => {
    const html = '<p><strong>Lorem Ipsum</strong>\nis simply dummy text\n</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [
          {
            type: 'strong',
            children: [{ text: 'Lorem Ipsum' }],
          },
          { text: ' is simply dummy text' },
        ],
      },
    ]);
  });

  it('transforms newlines to space after an inline tag', () => {
    const html = '<p><strong>Lorem Ipsum</strong>\nis simply dummy text</p>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [
          {
            type: 'strong',
            children: [{ text: 'Lorem Ipsum' }],
          },
          { text: ' is simply dummy text' },
        ],
      },
    ]);
  });

  it('it removes new lines at beginning of text of block nodes', () => {
    const html = '<b>hello</b><p>\n world\n</p><i>dot</i>';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'b',
        children: [{ text: 'hello' }],
      },
      {
        type: 'p',
        children: [{ text: 'world' }],
      },
      {
        type: 'i',
        children: [{ text: 'dot' }],
      },
    ]);
  });

  it('it removes consecutive space in inline nodes', () => {
    const html = `<b>hello </b><i> world</i>`;
    // console.log(JSON.stringify(tojson(html), null, 2));

    expect(tojson(html)).toStrictEqual([
      {
        type: 'b',
        children: [{ text: 'hello ' }],
      },
      {
        type: 'i',
        children: [{ text: 'world' }],
      },
    ]);
  });

  it('it handles text fragments', () => {
    const html =
      '<strong>Lorem Ipsum</strong>\nis simply dummy text of the printing and typesetting industry.';

    expect(tojson(html)).toStrictEqual([
      {
        type: 'strong',
        children: [{ text: 'Lorem Ipsum' }],
      },
      {
        text: ' is simply dummy text of the printing and typesetting industry.',
      },
    ]);
  });

  it('handles chrome + firefox style copy', () => {
    const html = `<strong>Hello</strong><span><span> </span>world</span>`;

    expect(tojson(html)).toStrictEqual([
      {
        type: 'strong',
        children: [{ text: 'Hello' }],
      },
      {
        text: ' ',
      },
      {
        text: 'world',
      },
    ]);
  });
});
