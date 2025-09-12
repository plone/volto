import { describe, it, expect } from 'vitest';
import type { Brain } from '@plone/types';
import type { Selection } from 'react-aria-components';
import {
  isAll,
  buildObjectBrowserUrl,
  processSelection,
  initializeSelectedKeys,
} from './utils';

describe('ObjectBrowserWidget utils', () => {
  describe('isAll', () => {
    it('should return true for "all" string', () => {
      expect(isAll('all')).toBe(true);
    });

    it('should return false for other strings', () => {
      expect(isAll('some')).toBe(false);
      expect(isAll('')).toBe(false);
    });

    it('should return false for non-strings', () => {
      expect(isAll([])).toBe(false);
      expect(isAll({})).toBe(false);
      expect(isAll(null)).toBe(false);
      expect(isAll(undefined)).toBe(false);
      expect(isAll(123)).toBe(false);
    });
  });

  describe('buildObjectBrowserUrl', () => {
    it('should return null when no parameters provided', () => {
      expect(buildObjectBrowserUrl()).toBeNull();
      expect(buildObjectBrowserUrl(undefined, undefined)).toBeNull();
    });

    it('should build search URL when searchText provided', () => {
      const result = buildObjectBrowserUrl(undefined, 'test search');
      expect(result).toBe(
        '/@objectBrowserWidget?metadata_fields:list=is_folderish&SearchableText=test%20search',
      );
    });

    it('should build path URL when currentPath provided', () => {
      const result = buildObjectBrowserUrl('/path/to/content');
      expect(result).toBe(
        '/@objectBrowserWidget/path/to/content?path.depth=1&metadata_fields:list=is_folderish',
      );
    });

    it('should prioritize searchText over currentPath', () => {
      const result = buildObjectBrowserUrl('/path/to/content', 'search');
      expect(result).toBe(
        '/@objectBrowserWidget?metadata_fields:list=is_folderish&SearchableText=search',
      );
    });

    it('should properly encode search text', () => {
      const result = buildObjectBrowserUrl(undefined, 'test & special chars');
      expect(result).toBe(
        '/@objectBrowserWidget?metadata_fields:list=is_folderish&SearchableText=test%20%26%20special%20chars',
      );
    });
  });

  describe('processSelection', () => {
    const mockItems: Brain[] = [
      { '@id': '/item1', title: 'Item 1' } as Brain,
      { '@id': '/item2', title: 'Item 2' } as Brain,
      { '@id': '/item3', title: 'Item 3' } as Brain,
    ];

    it('should return all items when selection is "all"', () => {
      const result = processSelection('all', mockItems);
      expect(result).toEqual(mockItems);
    });

    it('should filter items when selection is Set', () => {
      const selection = new Set(['/item1', '/item3']);
      const result = processSelection(selection, mockItems);
      expect(result).toEqual([mockItems[0], mockItems[2]]);
    });

    it('should filter items when selection is another Set', () => {
      const selection = new Set(['/item2']);
      const result = processSelection(selection, mockItems);
      expect(result).toEqual([mockItems[1]]);
    });

    it('should return empty array for empty selection Set', () => {
      const result = processSelection(new Set(), mockItems);
      expect(result).toEqual([]);
    });

    it('should return empty array for unknown selection type', () => {
      // @ts-ignore - testing runtime behavior
      const result = processSelection(null, mockItems);
      expect(result).toEqual([]);
    });
  });

  describe('initializeSelectedKeys', () => {
    it('should return empty Set when no defaultValue', () => {
      const result = initializeSelectedKeys();
      expect(result).toEqual(new Set());
    });

    it('should return empty Set when defaultValue is "all"', () => {
      const result = initializeSelectedKeys('all');
      expect(result).toEqual(new Set());
    });

    it('should process string array defaultValue', () => {
      const result = initializeSelectedKeys(['/item1', '/item2']);
      const expected = new Set([
        { id: '/item1', title: '' },
        { id: '/item2', title: '' },
      ]);
      expect(result).toEqual(expected);
    });

    it('should process object array defaultValue with any type', () => {
      const defaultValue: any = [
        { '@id': '/item1', title: 'Item 1' },
        { '@id': '/item2', title: 'Item 2' },
      ];
      const result = initializeSelectedKeys(defaultValue);
      const expected = new Set([
        { id: '/item1', title: 'Item 1' },
        { id: '/item2', title: 'Item 2' },
      ]);
      expect(result).toEqual(expected);
    });

    it('should handle objects without title', () => {
      const defaultValue: any = [
        { '@id': '/item1' },
        { '@id': '/item2', title: undefined },
      ];
      const result = initializeSelectedKeys(defaultValue);
      const expected = new Set([
        { id: '/item1', title: '' },
        { id: '/item2', title: '' },
      ]);
      expect(result).toEqual(expected);
    });

    it('should handle mixed string and object array', () => {
      const defaultValue: any = [
        '/item1',
        { '@id': '/item2', title: 'Item 2' },
      ];
      const result = initializeSelectedKeys(defaultValue);
      const expected = new Set([
        { id: '/item1', title: '' },
        { id: '/item2', title: 'Item 2' },
      ]);
      expect(result).toEqual(expected);
    });
  });
});
