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
    const parsed = new JSDOM(html);
    const document = parsed.window.document;
    const editor = makeEditor();
    const body =
      document.getElementsByTagName('google-sheets-html-origin').length > 0
        ? document.querySelector('google-sheets-html-origin > table')
        : document.body;
    const json = deserialize(editor, body);

    expect(tojson(json)).toStrictEqual([
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
});
