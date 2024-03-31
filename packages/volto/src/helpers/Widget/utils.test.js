import { getWidget } from './utils';

describe('getWidget helper', () => {
  var initial = { id: '', field: { factory: '', widget: '', type: '' } };
  it('id: title -> title', () => {
    const title = { ...initial, id: 'title' };
    expect(getWidget(title.id, title.field)).toBe('title');
  });

  it('id: description -> description', () => {
    const description = { ...initial, id: 'description' };
    expect(getWidget(description.id, description.field)).toBe('description');
  });

  it('id: subjects -> tags', () => {
    const tags = { ...initial, id: 'subjects' };
    expect(getWidget(tags.id, tags.field)).toBe('tags');
  });

  it('field.factory: Choice -> choices', () => {
    const choices = { ...initial, field: { factory: 'Choice' } };
    expect(getWidget(choices.id, choices.field)).toBe('choices');
  });

  it('field.factory: Relation Choice -> relation', () => {
    const relation = { ...initial, field: { factory: 'Relation Choice' } };
    expect(getWidget(relation.id, relation.field)).toBe('relation');
  });

  it('field.factory: Relation List -> relations', () => {
    const relations = { ...initial, field: { factory: 'Relation List' } };
    expect(getWidget(relations.id, relations.field)).toBe('relations');
  });

  it('field.factory: Image -> image', () => {
    const image = { ...initial, field: { factory: 'Image' } };
    expect(getWidget(image.id, image.field)).toBe('image');
  });

  it('field.factory: File -> file', () => {
    const file = { ...initial, field: { factory: 'File' } };
    expect(getWidget(file.id, file.field)).toBe('file');
  });

  it('return the widget', () => {
    const defaultWidget = { ...initial, field: { widget: 'widget' } };
    expect(getWidget(defaultWidget.id, defaultWidget.field)).toBe('widget');
  });

  it('return the type', () => {
    const defaultType = { ...initial, field: { type: 'type' } };
    expect(getWidget(defaultType.id, defaultType.field)).toBe('type');
  });

  it('return the id', () => {
    const defaultId = { ...initial, id: 'other_id' };
    expect(getWidget(defaultId.id, defaultId.field)).toBe('other_id');
  });
});
