import config from '@plone/volto/registry';

import { JSDOM } from 'jsdom';
import { deserialize } from '@plone/volto-slate/editor/deserialize';
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
    const html = `<i>hello
world</i>`;

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello world' }],
      },
    ]);
  });

  it('replaces multiple newlines inside text with a space', () => {
    const html = `<i>hello


world</i>`;

    expect(tojson(html)).toStrictEqual([
      {
        type: 'i',
        children: [{ text: 'hello world' }],
      },
    ]);
  });

  it('transforms newlines at beginning of tags to space', () => {
    const html = `<b>hello</b><i>
world</i>`;

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

  it('transforms newlines after an space', () => {
    const html = `<p><strong>Lorem Ipsum</strong>
is simply dummy text
</p>`;

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

  it('adds a space before text if inline node does not end with space', () => {
    const html = `<p><strong>Lorem Ipsum </strong>
is simply dummy text
</p>`;

    expect(tojson(html)).toStrictEqual([
      {
        type: 'p',
        children: [
          {
            type: 'strong',
            children: [{ text: 'Lorem Ipsum ' }],
          },
          { text: 'is simply dummy text' },
        ],
      },
    ]);
  });

  it('it removes new lines at beginning of text of block nodes', () => {
    const html = `<b>hello</b><p>
world
</p><i>dot</i>`;

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
    const html = `<strong>Lorem Ipsum</strong>
is simply dummy text of the printing and typesetting industry.`;

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
});
