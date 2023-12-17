import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import CreateTranslation from './CreateTranslation';

const mockStore = configureStore();

describe('CreateTranslation', () => {
  it('renders a CreateTranslation component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      translations: {
        translationLocation: '/es',
      },
      site: {
        'plone.availableLanguages': ['de', 'es'],
      },
      addons: {
        isMultilingual: true,
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CreateTranslation
            location={{
              pathname: '/blog-post',
              state: {
                language: 'es',
                translationOf: '/en/page-en',
              },
            }}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
