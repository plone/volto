import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Header from './Header';

const mockStore = configureStore();

vi.mock('../Logo/Logo', () => ({
  default: vi.fn(() => <div id="logo" />),
}));

vi.mock('../SearchWidget/SearchWidget', () => ({
  default: vi.fn(() => <div id="searchwidget" />),
}));

vi.mock('../Anontools/Anontools', () => ({
  default: vi.fn(() => <div id="anontools" />),
}));

vi.mock('../Navigation/Navigation', () => ({
  default: vi.fn(() => <div id="navigation" />),
}));

vi.mock('../LanguageSelector/LanguageSelector', () => ({
  default: vi.fn(() => <div id="language-selector" />),
}));

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
