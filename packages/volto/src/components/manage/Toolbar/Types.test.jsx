import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import Types, { getTranslationsLeft, hasAddMenuItems } from './Types';

const mockStore = configureStore([thunk]);

describe('Types', () => {
  it('renders an empty types component', () => {
    const store = mockStore({
      types: { types: [] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a types component', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an active types component', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" active />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('types component if the user is anonymous', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: '',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" active />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

const translatable = {
  '@id': 'http://localhost:8080/Plone/en/folder',
  '@type': 'Document',
  '@components': {
    translations: {
      '@id': 'http://localhost:8080/Plone/en/folder/@translations',
      items: [],
    },
  },
};

const renderTypes = ({ multilingual, types = [], content = translatable }) => {
  const store = mockStore({
    types: { types },
    site: {
      data: {
        features: { multilingual },
        'plone.available_languages': ['en', 'de'],
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  return renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Types pathname="/en/folder" content={content} />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Types translations', () => {
  it('renders nothing on a non-multilingual site without addable types', () => {
    const component = renderTypes({ multilingual: false });
    expect(component.toJSON().type).toBe('span');
  });

  it('does not offer translations on a non-multilingual site', () => {
    const component = renderTypes({
      multilingual: false,
      types: [{ '@id': '/@types/Document', title: 'Document', addable: true }],
    });
    expect(JSON.stringify(component.toJSON())).not.toContain(
      'create-translation',
    );
    expect(JSON.stringify(component.toJSON())).toContain(
      'toolbar-add-document',
    );
  });

  it('offers the missing translations on a multilingual site', () => {
    const component = renderTypes({ multilingual: true });
    const json = JSON.stringify(component.toJSON());
    expect(json).toContain('Add Translation…');
    expect(json).toContain('/en/folder/create-translation');
  });
});

describe('hasAddMenuItems', () => {
  const args = {
    content: translatable,
    availableLanguages: ['en', 'de'],
    currentLanguage: 'en',
  };

  it('is true when there are addable types', () => {
    expect(hasAddMenuItems({ ...args, types: [{ title: 'Document' }] })).toBe(
      true,
    );
  });

  it('ignores translations on a non-multilingual site', () => {
    expect(hasAddMenuItems({ ...args, isMultilingual: false })).toBe(false);
  });

  it('is true on a multilingual site with translations left', () => {
    expect(hasAddMenuItems({ ...args, isMultilingual: true })).toBe(true);
  });

  it('is false on a multilingual site when every language is translated', () => {
    const content = {
      ...translatable,
      '@components': {
        translations: { items: [{ language: 'de' }] },
      },
    };
    expect(hasAddMenuItems({ ...args, content, isMultilingual: true })).toBe(
      false,
    );
    expect(
      getTranslationsLeft({ ...args, content, isMultilingual: true }),
    ).toEqual([]);
  });
});
