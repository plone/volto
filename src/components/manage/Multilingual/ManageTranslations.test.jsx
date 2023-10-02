import config from '@plone/volto/registry';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import ManageTranslations from './ManageTranslations';

beforeAll(() => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['de', 'es'];
});

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
          '@id': 'http://127.0.0.1:8080/Plone/my-page',
          language: 'en',
        },
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
