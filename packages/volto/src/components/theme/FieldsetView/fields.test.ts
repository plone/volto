import { describe, it, expect } from 'vitest';
import type { JSONSchema } from '@plone/types';
import { getFieldDefinition, getFields } from './fields';

/**
 * A trimmed copy of the `Person` content type schema, as plone.restapi serves
 * it. `social_links` is the case that motivated this: a field whose backend
 * schema asks for a specific frontend widget.
 */
const schema = {
  title: 'Person',
  type: 'object',
  required: ['title'],
  fieldsets: [
    { behavior: 'plone', id: 'default', title: 'Default', fields: ['title'] },
    {
      behavior: 'plone',
      id: 'social_media',
      title: 'Social Media',
      fields: ['social_links'],
    },
  ],
  properties: {
    title: {
      behavior: 'plone.dublincore',
      factory: 'Text line (String)',
      title: 'Title',
      type: 'string',
    },
    description: {
      behavior: 'plone.dublincore',
      factory: 'Text',
      title: 'Summary',
      type: 'string',
      widget: 'textarea',
    },
    language: {
      behavior: 'plone.dublincore',
      factory: 'Choice',
      title: 'Language',
      type: 'string',
      vocabulary: {
        '@id':
          'http://localhost:3000/@vocabularies/plone.app.vocabularies.SupportedContentLanguages',
      },
    },
    social_links: {
      behavior: 'plonegovbr.socialmedia.links',
      factory: 'JSONField',
      title: 'Profiles',
      type: 'dict',
      widget: 'json',
      widgetOptions: {
        frontendOptions: {
          widget: 'social_media_object_list',
          widgetProps: { schemaName: 'socialMedia' },
        },
      },
    },
  },
} as unknown as JSONSchema;

describe('getFieldDefinition', () => {
  it('keeps the schema property and adds the field id', () => {
    const field = getFieldDefinition(schema, 'description');

    expect(field).toMatchObject({
      id: 'description',
      title: 'Summary',
      type: 'string',
      widget: 'textarea',
      factory: 'Text',
    });
  });

  it('leaves a field without tagged values untouched', () => {
    const field = getFieldDefinition(schema, 'title');

    expect(field.widget).toBeUndefined();
    expect(field._widget).toBeUndefined();
  });

  it('prefers the widget asked for by frontendOptions', () => {
    const field = getFieldDefinition(schema, 'social_links');

    expect(field.widget).toBe('social_media_object_list');
  });

  it('keeps the displaced widget as a fallback', () => {
    const field = getFieldDefinition(schema, 'social_links');

    expect(field._widget).toBe('json');
  });

  it('merges the widget props onto the field', () => {
    const field = getFieldDefinition(schema, 'social_links');

    expect(field).toMatchObject({ schemaName: 'socialMedia' });
  });

  it('keeps the rest of the schema property alongside the hints', () => {
    const field = getFieldDefinition(schema, 'social_links');

    expect(field).toMatchObject({
      id: 'social_links',
      title: 'Profiles',
      type: 'dict',
      factory: 'JSONField',
    });
  });

  it('still describes a field that is missing from the schema', () => {
    expect(getFieldDefinition(schema, 'absent')).toEqual({ id: 'absent' });
  });

  it('does not throw when the schema is undefined', () => {
    expect(getFieldDefinition(undefined, 'title')).toEqual({ id: 'title' });
  });

  it('does not throw when the schema carries no properties', () => {
    const broken = { title: 'Broken' } as unknown as JSONSchema;

    expect(getFieldDefinition(broken, 'title')).toEqual({ id: 'title' });
  });
});

describe('getFields', () => {
  it('returns one definition per field name, in the order given', () => {
    const fields = getFields(schema, ['social_links', 'title']);

    expect(fields.map((field) => field.id)).toEqual(['social_links', 'title']);
  });

  it('applies the tagged values of every field it returns', () => {
    const [field] = getFields(schema, ['social_links']);

    expect(field.widget).toBe('social_media_object_list');
  });

  it('returns an empty list when the fieldset declares no fields', () => {
    expect(getFields(schema, undefined)).toEqual([]);
  });

  it('returns an empty list for an empty fieldset', () => {
    expect(getFields(schema, [])).toEqual([]);
  });
});
