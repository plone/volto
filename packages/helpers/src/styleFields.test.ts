import { describe, expect, it, vi } from 'vitest';
import {
  applyStyleFieldDefaultsInData,
  getStyleFieldsFromBlockSchema,
  getStyleFieldsFromSchema,
  resolveStyleFields,
} from './styleFields';

const resolveDefinitions = vi.fn((fieldName: string) => {
  if (fieldName === 'blockWidth') {
    return [
      {
        name: 'default',
        label: 'Default',
        style: { '--block-width': 'var(--default-container-width)' },
      },
      {
        name: 'full',
        label: 'Full',
        style: { '--block-width': '100%' },
      },
    ];
  }

  if (fieldName === 'theme') {
    return [
      {
        name: 'default',
        label: 'Default',
        style: { '--theme-color': 'white' },
      },
      {
        name: 'sand',
        label: 'Sand',
        style: { '--theme-color': 'wheat' },
      },
    ];
  }

  return [];
});

describe('style fields helpers', () => {
  it('resolves style objects from root-level fields', () => {
    expect(
      resolveStyleFields({
        data: {
          type: 'unknown',
          '@type': 'image',
          blockWidth: 'full',
        },
        fieldConfigs: {
          blockWidth: {},
        },
        resolveDefinitions,
      }),
    ).toEqual({
      style: { '--block-width': '100%' },
      values: { blockWidth: 'full' },
    });
  });

  it('falls back to legacy styles storage when present', () => {
    expect(
      resolveStyleFields({
        data: {
          '@type': 'teaser',
          styles: {
            theme: 'sand',
          },
        },
        fieldConfigs: {
          theme: {
            path: 'styles.theme',
          },
        },
        resolveDefinitions,
      }),
    ).toEqual({
      style: { '--theme-color': 'wheat' },
      values: { theme: 'sand' },
    });
  });

  it('falls back to the root field when path is configured but nested data is missing', () => {
    expect(
      resolveStyleFields({
        data: {
          '@type': 'teaser',
          theme: 'sand',
          styles: {},
        },
        fieldConfigs: {
          theme: {
            path: 'styles.theme',
          },
        },
        resolveDefinitions,
      }),
    ).toEqual({
      style: { '--theme-color': 'wheat' },
      values: { theme: 'sand' },
    });
  });

  it('applies configured defaults for missing values', () => {
    const data = {
      type: 'p',
      children: [],
    } as Record<string, unknown>;

    applyStyleFieldDefaultsInData({
      data,
      fieldConfigs: {
        blockWidth: {
          defaultValue: 'default',
          values: ['default', 'full'],
        },
      },
      resolveDefinitions,
    });

    expect(data).toEqual({
      type: 'p',
      children: [],
      blockWidth: 'default',
    });
  });

  it('writes defaults to a configured nested path', () => {
    const data = {
      '@type': 'teaser',
      styles: {},
    } as Record<string, unknown>;

    applyStyleFieldDefaultsInData({
      data,
      fieldConfigs: {
        theme: {
          defaultValue: 'default',
          path: 'styles.theme',
        },
      },
      resolveDefinitions,
    });

    expect(data).toEqual({
      '@type': 'teaser',
      styles: {
        theme: 'default',
      },
    });
  });

  it('extracts style field metadata from schema properties', () => {
    expect(
      getStyleFieldsFromSchema({
        title: 'Test',
        fieldsets: [],
        required: [],
        properties: {
          theme: {
            widget: 'theme',
            default: 'default',
            choices: [
              ['default', 'Default'],
              ['sand', 'Sand'],
            ],
            styleField: true,
          },
          variant: {
            widget: 'theme',
            actions: ['primary', 'secondary'],
            styleField: {
              path: 'styles.variant',
            },
          },
        },
      }),
    ).toEqual({
      theme: {
        defaultValue: 'default',
        values: ['default', 'sand'],
        path: undefined,
      },
      variant: {
        defaultValue: undefined,
        values: ['primary', 'secondary'],
        path: 'styles.variant',
      },
    });
  });

  it('extracts style fields from blockSchema functions', () => {
    expect(
      getStyleFieldsFromBlockSchema(
        {
          blockSchema: ({ formData }: any) => ({
            title: 'Theme block',
            fieldsets: [],
            required: [],
            properties: {
              theme: {
                default: formData?.themeDefault ?? 'default',
                styleField: true,
              },
            },
          }),
        },
        { themeDefault: 'sand' } as any,
      ),
    ).toEqual({
      theme: {
        defaultValue: 'sand',
        values: undefined,
        path: undefined,
      },
    });
  });
});
