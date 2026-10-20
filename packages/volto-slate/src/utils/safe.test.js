import { safeEditorNodes } from './safe.js';
import { Editor } from 'slate';
import { describe, it, expect, vi } from 'vitest';

describe('safeEditorNodes', () => {
  it('should return nodes when Editor.nodes works', () => {
    const mockEntry = [{ text: 'hello' }, [0]];
    vi.spyOn(Editor, 'nodes').mockReturnValueOnce(
      [mockEntry][Symbol.iterator](),
    );

    const result = safeEditorNodes({ selection: {} }, {});
    expect(result).toEqual([mockEntry]);
  });

  it('should return empty array and warn when Editor.nodes throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Editor, 'nodes').mockImplementation(() => {
      throw new Error('safeEditorNodes: selection invalid or out of bounds.');
    });

    const result = safeEditorNodes({ selection: null }, {});
    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
