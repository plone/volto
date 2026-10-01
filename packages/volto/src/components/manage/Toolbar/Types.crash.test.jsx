import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';

import Types from './Types';

const mockStore = configureStore([thunk]);

describe('Types Defensive', () => {
  it('does not crash when a language is missing from langmap', () => {
    const store = mockStore({
      site: {
        data: {
          'plone.available_languages': ['en', 'fr_HT'], // fr_HT is missing from langmap
        },
      },
      types: { types: [{ title: 'Document' }] },
      content: {
        data: {
          '@id': '/test',
          '@type': 'Document',
          language: { token: 'en' },
          '@components': {
            translations: { items: [] },
          },
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });

    // This should not throw TypeError: Cannot read properties of undefined (reading 'nativeName')
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" active />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toBeDefined();
  });
});
