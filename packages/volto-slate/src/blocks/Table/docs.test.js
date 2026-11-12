import docs from './docs.block.md?raw';

describe('Table block docs', () => {
  const examples = [...docs.matchAll(/```json\n([\s\S]*?)\n```/g)].map(
    ([, json]) => JSON.parse(json),
  );

  it('has examples', () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  it.each(examples.map((example) => [example['@type'], example]))(
    'the %s example is a slateTable block whose cells follow the table format',
    (type, example) => {
      expect(example['@type']).toBe('slateTable');
      const { rows } = example.table;
      expect(rows.length).toBeGreaterThan(0);

      const width = rows[0].cells.length;
      for (const row of rows) {
        expect(row.cells.length).toBe(width);
        for (const cell of row.cells) {
          expect(['header', 'data']).toContain(cell.type);
          expect(Array.isArray(cell.value)).toBe(true);
          expect(cell.value.length).toBeGreaterThan(0);
        }
      }
    },
  );
});
