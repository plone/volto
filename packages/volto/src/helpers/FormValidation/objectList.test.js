import { EMPTY_ITEM_SCHEMA, itemSchemaFor, rowKeys } from './objectList';

describe('rowKeys', () => {
  it('keys an entry by its @id when it is unique', () => {
    expect(rowKeys([{ '@id': 'a' }, { '@id': 'b' }])).toEqual(['a', 'b']);
  });

  it('keys an entry without @id by its content', () => {
    expect(rowKeys([{ value: 'x' }])).toEqual(['#{"value":"x"}']);
  });

  it('keeps repeated entries apart with a counter', () => {
    const keys = rowKeys([{ value: 'x' }, { value: 'x' }, { value: 'x' }]);
    expect(new Set(keys).size).toBe(3);
    expect(keys[1]).toBe('#{"value":"x"}~2');
  });

  it('keys a repeated @id by content, not by the id again', () => {
    const keys = rowKeys([{ '@id': 'a' }, { '@id': 'a', value: 'x' }]);
    expect(keys[0]).toBe('a');
    expect(keys[1]).toBe('#{"@id":"a","value":"x"}');
  });

  it('keeps a key with the entry it belongs to after a reorder', () => {
    const rows = [{ value: 'x' }, { value: 'y' }];
    const [keyX, keyY] = rowKeys(rows);
    const reordered = [rows[1], rows[0]];
    expect(rowKeys(reordered)).toEqual([keyY, keyX]);
  });
});

describe('itemSchemaFor', () => {
  it('returns the base schema without a schemaExtender', () => {
    const base = { title: 'Base' };
    expect(itemSchemaFor({ baseSchema: base, item: {} })).toBe(base);
  });

  it('returns what the schemaExtender returns', () => {
    const base = { title: 'Base' };
    const extended = itemSchemaFor({
      baseSchema: base,
      item: { value: 1 },
      schemaExtender: (schema, item, intl) => ({
        ...schema,
        intl,
        seen: item.value,
      }),
      intl: 'intl',
    });
    expect(extended).toEqual({ title: 'Base', intl: 'intl', seen: 1 });
  });

  it('has an empty item schema with fieldsets', () => {
    expect(EMPTY_ITEM_SCHEMA.fieldsets).toHaveLength(1);
    expect(EMPTY_ITEM_SCHEMA.properties).toEqual({});
  });
});
