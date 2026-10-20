import { describe, it, expect } from 'vitest';
import { applyTaggedValues } from './taggedValues';

describe('applyTaggedValues', () => {
  it('returns a field with no widgetOptions untouched', () => {
    const field = { id: 'title', type: 'string' };

    expect(applyTaggedValues(field)).toBe(field);
  });

  it('returns a field with no frontendOptions untouched', () => {
    const field = {
      id: 'subjects',
      widgetOptions: {
        vocabulary: { '@id': 'plone.app.vocabularies.Keywords' },
      },
    };

    expect(applyTaggedValues(field)).toBe(field);
  });

  it('applies the hinted widget over the declared one', () => {
    const field = applyTaggedValues({
      id: 'social_links',
      widget: 'json',
      widgetOptions: {
        frontendOptions: { widget: 'social_media_object_list' },
      },
    });

    expect(field.widget).toBe('social_media_object_list');
  });

  it('keeps the declared widget as _widget', () => {
    const field = applyTaggedValues({
      id: 'social_links',
      widget: 'json',
      widgetOptions: {
        frontendOptions: { widget: 'social_media_object_list' },
      },
    });

    expect(field._widget).toBe('json');
  });

  it('does not set a widget when the hint carries none', () => {
    const field = applyTaggedValues({
      id: 'email',
      widget: 'string',
      widgetOptions: { frontendOptions: { format: 'email' } },
    });

    expect(field.widget).toBe('string');
    expect(field._widget).toBeUndefined();
  });

  it('merges widgetProps onto the field', () => {
    const field = applyTaggedValues({
      id: 'social_links',
      widgetOptions: {
        frontendOptions: {
          widget: 'social_media_object_list',
          widgetProps: { schemaName: 'socialMedia', mode: 'image' },
        },
      },
    });

    expect(field).toMatchObject({ schemaName: 'socialMedia', mode: 'image' });
  });

  it('merges any other tagged value, such as format', () => {
    const field = applyTaggedValues({
      id: 'contact',
      widgetOptions: { frontendOptions: { format: 'email' } },
    });

    expect(field.format).toBe('email');
  });

  it('lets widgetProps win over the schema property they shadow', () => {
    const field = applyTaggedValues({
      id: 'related',
      title: 'Declared title',
      widgetOptions: {
        frontendOptions: { widgetProps: { title: 'Hinted title' } },
      },
    });

    expect(field.title).toBe('Hinted title');
  });

  it('does not mutate the field it is given', () => {
    const field = {
      id: 'social_links',
      widget: 'json',
      widgetOptions: {
        frontendOptions: { widget: 'social_media_object_list' },
      },
    };

    applyTaggedValues(field);

    expect(field.widget).toBe('json');
    expect(field).not.toHaveProperty('_widget');
  });

  it('keeps widgetOptions on the field, for the resolvers that read them', () => {
    const widgetOptions = {
      frontendOptions: { widget: 'social_media_object_list' },
    };

    expect(
      applyTaggedValues({ id: 'social_links', widgetOptions }),
    ).toMatchObject({ widgetOptions });
  });
});
