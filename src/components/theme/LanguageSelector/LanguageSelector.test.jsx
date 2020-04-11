import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import LanguageSelector from './LanguageSelector';

jest.mock('~/config', () => ({
  settings: {
    isMultilingual: true,
    supportedLanguages: ['de', 'ca'],
  },
}));

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
              items: [{ language: 'ca', '@id': '/ca' }],
            },
          },
        },
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
