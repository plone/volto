import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import LanguageSelector from './LanguageSelector';

beforeAll(() => {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['de', 'es'];
});

const mockStore = configureStore();

describe('LanguageSelector', () => {
  it('renders a language selector component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {
          '@components': {
            translations: {
              items: [{ language: 'es', '@id': '/es' }],
            },
          },
        },
      },
      site: {
        data: { 'plone.default_language': 'es' },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <LanguageSelector />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
