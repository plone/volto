import { syncCreateTableBlock } from './deconstruct';

describe('syncCreateTableBlock', () => {
  it('creates a slateTable block with the given rows', () => {
    const rows = [
      {
        key: 'row1',
        cells: [
          {
            key: 'cell1',
            type: 'data',
            value: [{ children: [{ text: '1' }] }],
          },
        ],
      },
    ];

    const [id, block] = syncCreateTableBlock(rows);

    expect(id).toBeDefined();
    expect(block['@type']).toBe('slateTableaa');
    expect(block.table.rows).toEqual(rows);
  });
});
