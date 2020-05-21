import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import CreateTranslation from './CreateTranslation';

jest.mock('~/config', () => ({
  settings: {
    isMultilingual: true,
    supportedLanguages: ['de', 'es'],
  },
}));

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
