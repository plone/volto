import { describe, it, expect } from 'vitest';
import type { JSONSchema } from '@plone/types';
import { getFieldDefinition, getFields } from './fields';

const makeSchema = (properties: Record<string, any>): JSONSchema => ({
  title: 'Test schema',
  fieldsets: [
    { id: 'default', title: 'Default', fields: Object.keys(properties) },
  ],
  properties,
  required: [],
});

describe('getFieldDefinition', () => {
  it('keeps the schema property and adds the id and the widget', () => {
    const schema = makeSchema({
      author: { title: 'Author', description: 'Who wrote it', type: 'string' },
    });

    expect(getFieldDefinition(schema, 'author')).toEqual({
      title: 'Author',
      description: 'Who wrote it',
      type: 'string',
      id: 'author',
      widget: 'string',
    });
  });

  it.each([
    ['title', 'title'],
    ['description', 'description'],
    ['subjects', 'tags'],
  ])('resolves the widget of %s from the field id', (fieldName, widget) => {
    const schema = makeSchema({ [fieldName]: { type: 'string' } });

    expect(getFieldDefinition(schema, fieldName).widget).toBe(widget);
  });

  it.each([
    ['Choice', 'choices'],
    ['Relation Choice', 'relation'],
    ['Relation List', 'relations'],
    ['Image', 'image'],
    ['File', 'file'],
  ])(
    'resolves the widget of a %s field from its factory',
    (factory, widget) => {
      const schema = makeSchema({ field: { factory, type: 'string' } });

      expect(getFieldDefinition(schema, 'field').widget).toBe(widget);
    },
  );

  it('prefers the widget declared by the backend over the field type', () => {
    const schema = makeSchema({ body: { type: 'string', widget: 'richtext' } });

    expect(getFieldDefinition(schema, 'body').widget).toBe('richtext');
  });

  it('falls back to the field type when no widget is declared', () => {
    const schema = makeSchema({ count: { type: 'number' } });

    expect(getFieldDefinition(schema, 'count').widget).toBe('number');
  });

  it('falls back to the field name when neither widget nor type is known', () => {
    const schema = makeSchema({ mystery: {} });

    expect(getFieldDefinition(schema, 'mystery').widget).toBe('mystery');
  });

  it('still describes a field that is missing from the schema', () => {
    const schema = makeSchema({ author: { type: 'string' } });

    expect(getFieldDefinition(schema, 'absent')).toEqual({
      id: 'absent',
      widget: 'absent',
    });
  });

  it('does not throw when the schema is undefined', () => {
    expect(getFieldDefinition(undefined, 'author')).toEqual({
      id: 'author',
      widget: 'author',
    });
  });

  it('does not throw when the schema carries no properties', () => {
    const schema = { title: 'Broken' } as unknown as JSONSchema;

    expect(getFieldDefinition(schema, 'author')).toEqual({
      id: 'author',
      widget: 'author',
    });
  });
});

describe('getFields', () => {
  const schema = makeSchema({
    title: { title: 'Title', type: 'string' },
    author: { title: 'Author', type: 'string' },
    count: { title: 'Count', type: 'number' },
  });

  it('returns one definition per field name, in the order given', () => {
    const fields = getFields(schema, ['count', 'author']);

    expect(fields.map((field) => field.id)).toEqual(['count', 'author']);
    expect(fields.map((field) => field.widget)).toEqual(['number', 'string']);
  });

  it('returns an empty list when the fieldset declares no fields', () => {
    expect(getFields(schema, undefined)).toEqual([]);
  });

  it('returns an empty list for an empty fieldset', () => {
    expect(getFields(schema, [])).toEqual([]);
  });
});
