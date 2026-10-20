import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import docs from './docs';

// The editor joins text nodes with spaces, so it adds a space before
// punctuation that follows a link or formatting. That's not meaningful here.
const normalize = (text) =>
  text.replace(/\s+/g, ' ').replace(/ ([.,;:!?])/g, '$1');

describe('Text block docs', () => {
  const examples = [...docs.matchAll(/```json\n([\s\S]*?)\n```/g)].map(
    ([, json]) => JSON.parse(json),
  );

  it('has examples', () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  it.each(examples.map((example) => [example.value[0].type, example]))(
    'the %s example is a slate block whose plaintext matches its value',
    (type, example) => {
      expect(example['@type']).toBe('slate');
      expect(example.plaintext).toBe(
        normalize(serializeNodesToText(example.value)),
      );
    },
  );
});
