import { describe, it, expect } from 'vitest';

// Test type to simulate Brain items
type TestBrain = {
  '@id': string;
  title: string;
};

/**
 * Test for handleSelectionChange logic
 */
describe('handleSelectionChange Logic', () => {
  // Simula la logica del component ObjectBrowserWidget
  function handleSelectionChange(
    keys: any,
    knownItems: TestBrain[],
  ): { id: string; title: string }[] {
    const items = knownItems ?? [];

    let selected: TestBrain[] = [];
    if (typeof keys === 'string' && keys === 'all') {
      selected = items;
    } else if (Array.isArray(keys)) {
      selected = items.filter((item) => keys.includes(item['@id']));
    } else if (keys instanceof Set) {
      selected = items.filter((item) => keys.has(item['@id']));
    }

    return selected.map((item) => ({ id: item['@id'], title: item.title }));
  }

  const mockItems: TestBrain[] = [
    { '@id': '/folder1', title: 'Test Folder' },
    { '@id': '/page1', title: 'Test Page' },
    { '@id': '/news1', title: 'Test News' },
  ];

  it('handles Set selection correctly', () => {
    const keys = new Set(['/folder1', '/page1']);
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '/folder1', title: 'Test Folder' },
      { id: '/page1', title: 'Test Page' },
    ]);
  });

  it('handles Array selection correctly', () => {
    const keys = ['/page1', '/news1'];
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '/page1', title: 'Test Page' },
      { id: '/news1', title: 'Test News' },
    ]);
  });

  it('handles single item selection', () => {
    const keys = new Set(['/folder1']);
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(1);
    expect(result).toEqual([{ id: '/folder1', title: 'Test Folder' }]);
  });

  it('handles "all" selection', () => {
    const keys = 'all';
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: '/folder1', title: 'Test Folder' },
      { id: '/page1', title: 'Test Page' },
      { id: '/news1', title: 'Test News' },
    ]);
  });

  it('handles empty selection', () => {
    const keys = new Set([]);
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('handles non-existent item selection', () => {
    const keys = new Set(['/non-existent']);
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('handles mixed existing and non-existing items', () => {
    const keys = new Set(['/folder1', '/non-existent', '/page1']);
    const result = handleSelectionChange(keys, mockItems);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: '/folder1', title: 'Test Folder' },
      { id: '/page1', title: 'Test Page' },
    ]);
  });

  it('handles empty items list', () => {
    const keys = new Set(['/folder1']);
    const result = handleSelectionChange(keys, []);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('handles undefined/null keys gracefully', () => {
    const result1 = handleSelectionChange(undefined, mockItems);
    expect(result1).toEqual([]);

    const result2 = handleSelectionChange(null, mockItems);
    expect(result2).toEqual([]);
  });
});
