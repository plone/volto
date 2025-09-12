import { describe, it, expect } from 'vitest';

/**
 * Test maximumSelectionSize logic to determine selectionBehavior
 */
describe('maximumSelectionSize Logic', () => {
  // Simulates the logic implemented in the component
  function getSelectionBehavior(
    widgetOptions: any,
    defaultBehavior: 'toggle' | 'replace' = 'toggle',
  ): 'toggle' | 'replace' {
    const maxSize = widgetOptions?.pattern_options?.maximumSelectionSize;
    return maxSize === 1 ? 'replace' : defaultBehavior;
  }

  it('returns "replace" when maximumSelectionSize is 1', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: 1,
        selectableTypes: ['Document'],
      },
    };

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('replace');
  });

  it('returns "toggle" when maximumSelectionSize is undefined', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: undefined,
        selectableTypes: ['Document', 'Folder'],
      },
    };

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('toggle');
  });

  it('returns "toggle" when maximumSelectionSize is greater than 1', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: 5,
        selectableTypes: ['Document', 'Folder'],
      },
    };

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('toggle');
  });

  it('returns "toggle" when maximumSelectionSize is 0', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: 0,
        selectableTypes: ['Document'],
      },
    };

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('toggle');
  });

  it('handles missing widgetOptions gracefully', () => {
    const result = getSelectionBehavior(undefined);
    expect(result).toBe('toggle');
  });

  it('handles missing pattern_options gracefully', () => {
    const widgetOptions = {
      pattern_options: undefined,
    };

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('toggle');
  });

  it('handles empty widgetOptions gracefully', () => {
    const widgetOptions = {};

    const result = getSelectionBehavior(widgetOptions);
    expect(result).toBe('toggle');
  });

  it('uses custom default behavior when provided', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: 3,
        selectableTypes: ['Document'],
      },
    };

    const result = getSelectionBehavior(widgetOptions, 'replace');
    expect(result).toBe('replace');
  });

  it('overrides custom default when maximumSelectionSize is 1', () => {
    const widgetOptions = {
      pattern_options: {
        maximumSelectionSize: 1,
        selectableTypes: ['Document'],
      },
    };

    // Even if default is toggle, it should return replace for maxSize=1
    const result = getSelectionBehavior(widgetOptions, 'toggle');
    expect(result).toBe('replace');
  });
});
