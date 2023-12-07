import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import ManageTranslations from './ManageTranslations';

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

const mockStore = configureStore();

describe('ManageTranslations', () => {
  it('renders a ManageTranslations component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {
          '@components': {
            translations: { items: [] },
          },
          title: 'My page',
          '@id': 'http://localhost:8080/Plone/my-page',
          language: 'en',
        },
      },
      site: {
        'plone.available_languages': ['de', 'es'],
      },
      addons: {
        isMultilingual: true,
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ManageTranslations
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
