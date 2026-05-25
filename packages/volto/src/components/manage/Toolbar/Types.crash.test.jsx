import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import Types from './Types';

config.settings.isMultilingual = true;
config.settings.supportedLanguages = ['en', 'missing-lang'];

const mockStore = configureStore();

describe('Types', () => {
  it('should not crash if a language is not in langmap', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      types: {
        types: [],
      },
    });

    const content = {
      '@type': 'Folder',
      '@id': '/folder',
      '@components': {
        translations: {
          items: [],
        },
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Types pathname="/folder" types={[]} content={content} />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Translate to missing-lang')).toBeInTheDocument();
  });
});
