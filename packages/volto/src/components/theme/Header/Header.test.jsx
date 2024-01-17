import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Header from './Header';

const mockStore = configureStore();

jest.mock('../Logo/Logo', () => jest.fn(() => <div id="logo" />));
jest.mock('../SearchWidget/SearchWidget', () =>
  jest.fn(() => <div id="searchwidget" />),
);
jest.mock('../Anontools/Anontools', () =>
  jest.fn(() => <div id="anontools" />),
);
jest.mock('../Navigation/Navigation', () =>
  jest.fn(() => <div id="navigation" />),
);
jest.mock('../LanguageSelector/LanguageSelector', () =>
  jest.fn(() => <div id="language-selector" />),
);

describe('Header', () => {
  it('renders a header component', () => {
    const store = mockStore({
      userSession: { token: null },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <Header pathname="/blog" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a header component - auth', () => {
    const store = mockStore({
      userSession: { token: '1234567890' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <Header pathname="/blog" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
