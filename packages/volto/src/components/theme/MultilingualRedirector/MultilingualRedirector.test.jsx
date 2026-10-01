import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import MultilingualRedirector from './MultilingualRedirector';

const mockStore = configureStore();

describe('MultilingualRedirector', () => {
  const renderComponent = (store, props) =>
    renderer.create(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter>
            <MultilingualRedirector {...props} />
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

  it('renders a MultilingualRedirector component', () => {
    const store = mockStore({
      site: {
        data: {},
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderComponent(store, { pathname: '/' });
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('does not switch to the path language when content language differs', () => {
    const store = mockStore({
      site: {
        data: {
          features: {
            multilingual: true,
          },
          'plone.available_languages': ['en', 'es'],
          'plone.default_language': 'en',
        },
      },
      intl: {
        locale: 'es',
        messages: {},
      },
    });

    renderer.act(() => {
      renderComponent(store, {
        pathname: '/en/document',
        contentLanguage: 'es',
      });
    });

    expect(store.getActions()).toEqual([]);
  });
});
