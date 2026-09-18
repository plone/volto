import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import config from '@plone/volto/registry';
import { widgetMapping } from '@plone/volto/config/Widgets';
import { getWidgetView } from './widget';

const ById = () => null;
const ByName = () => null;
const ByFallbackName = () => null;
const ByChoices = () => null;
const ByVocabulary = () => null;
const ByFactory = () => null;
const ByType = () => null;
const Default = () => null;

let originalViews: typeof config.widgets.views;

beforeEach(() => {
  originalViews = config.widgets.views;
  config.widgets.views = {
    default: Default,
    id: { known_field: ById },
    widget: { known_widget: ByName, declared_widget: ByFallbackName },
    vocabulary: { 'plone.app.vocabularies.Keywords': ByVocabulary },
    choices: ByChoices,
    factory: { 'Relation Choice': ByFactory },
    type: { known_type: ByType },
  } as unknown as typeof config.widgets.views;
});

afterEach(() => {
  config.widgets.views = originalViews;
});

describe('getWidgetView resolution order', () => {
  it('resolves by field id first', () => {
    expect(
      getWidgetView({
        id: 'known_field',
        widget: 'known_widget',
        type: 'known_type',
      }),
    ).toBe(ById);
  });

  it('resolves by widget name when the id is not registered', () => {
    expect(getWidgetView({ id: 'anything', widget: 'known_widget' })).toBe(
      ByName,
    );
  });

  it('falls back to _widget when the hinted widget is not registered', () => {
    expect(
      getWidgetView({
        id: 'social_links',
        widget: 'social_media_object_list',
        _widget: 'declared_widget',
      }),
    ).toBe(ByFallbackName);
  });

  it('prefers the hinted widget when it is registered', () => {
    expect(
      getWidgetView({
        id: 'social_links',
        widget: 'known_widget',
        _widget: 'declared_widget',
      }),
    ).toBe(ByName);
  });

  it('resolves a choice field by its choices', () => {
    expect(getWidgetView({ id: 'anything', choices: [['a', 'A']] })).toBe(
      ByChoices,
    );
  });

  it('resolves by factory when nothing earlier matched', () => {
    expect(getWidgetView({ id: 'anything', factory: 'Relation Choice' })).toBe(
      ByFactory,
    );
  });

  it('prefers the factory over a vocabulary', () => {
    // A relation field, as plone.restapi serves it: a factory, a catalog
    // vocabulary, and no widget. Edit picks it with a select; the view must
    // still render it as a relation.
    expect(
      getWidgetView({
        id: 'relationchoice_field',
        factory: 'Relation Choice',
        vocabulary: {
          '@id':
            'http://localhost:8080/Plone/@vocabularies/plone.app.vocabularies.Catalog',
        },
      }),
    ).toBe(ByFactory);
  });

  it('prefers the factory over choices', () => {
    expect(
      getWidgetView({
        id: 'anything',
        factory: 'Relation Choice',
        choices: [['a', 'A']],
      }),
    ).toBe(ByFactory);
  });

  it('prefers the hinted widget over the factory', () => {
    expect(
      getWidgetView({
        id: 'anything',
        widget: 'known_widget',
        _widget: 'declared_widget',
        factory: 'Relation Choice',
      }),
    ).toBe(ByName);
  });

  it('prefers the declared widget over the factory', () => {
    expect(
      getWidgetView({
        id: 'anything',
        widget: 'known_widget',
        factory: 'Relation Choice',
      }),
    ).toBe(ByName);
  });

  it('resolves by type when nothing earlier matched', () => {
    expect(getWidgetView({ id: 'anything', type: 'known_type' })).toBe(ByType);
  });

  it('prefers the factory over the type', () => {
    expect(
      getWidgetView({
        id: 'anything',
        factory: 'Relation Choice',
        type: 'known_type',
      }),
    ).toBe(ByFactory);
  });

  it('falls back to the default widget', () => {
    expect(getWidgetView({ id: 'anything', type: 'unregistered' })).toBe(
      Default,
    );
  });

  it('falls back to the default when neither widget nor _widget is registered', () => {
    expect(
      getWidgetView({
        id: 'social_links',
        widget: 'social_media_object_list',
        _widget: 'json',
      }),
    ).toBe(Default);
  });
});

describe('the default views registry', () => {
  const { views } = widgetMapping;
  const byId = views.id as Record<string, unknown>;
  const byFactory = views.factory as Record<string, unknown>;

  it.each([
    'title',
    'description',
    'subjects',
    'image',
    'file',
    'relatedItems',
  ])('resolves %s by field id, without a widget name', (fieldId) => {
    expect(byId[fieldId]).toBeDefined();
  });

  it.each(['Choice', 'File', 'Image', 'Relation Choice', 'Relation List'])(
    'resolves the %s factory',
    (factory) => {
      expect(byFactory[factory]).toBeDefined();
    },
  );

  it('renders the title with the title widget, not the default one', () => {
    expect(views.id.title).not.toBe(views.default);
  });

  it('renders the description with the description widget', () => {
    expect(views.id.description).toBe(views.widget.description);
  });

  describe('resolving relation fields that carry a vocabulary', () => {
    const catalog = {
      '@id':
        'http://localhost:8080/Plone/@vocabularies/plone.app.vocabularies.Catalog',
    };

    beforeEach(() => {
      config.widgets.views = views as unknown as typeof config.widgets.views;
    });

    it('renders a Relation Choice as a relation, not as a select', () => {
      const widget = getWidgetView({
        id: 'relationchoice_field',
        factory: 'Relation Choice',
        vocabulary: catalog,
      });

      expect(widget).toBe(views.widget.relation);
      expect(widget).not.toBe(views.choices);
    });

    it('renders a Relation List as relations, not as a select', () => {
      const widget = getWidgetView({
        id: 'relationlist_field',
        factory: 'Relation List',
        type: 'array',
        vocabulary: catalog,
      });

      expect(widget).toBe(views.widget.relations);
      expect(widget).not.toBe(views.choices);
    });

    it('still renders a plain Choice field with the select widget', () => {
      expect(
        getWidgetView({
          id: 'language',
          factory: 'Choice',
          vocabulary: catalog,
        }),
      ).toBe(views.choices);
    });
  });
});
