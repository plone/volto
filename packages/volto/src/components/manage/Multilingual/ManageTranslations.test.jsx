import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import ManageTranslations from './ManageTranslations';

jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

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
    const { container } = render(
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
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
