import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';

const initialState = {
  app: {
    name: 'A Volto website',
  },
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  breadcrumbs: {
    items: [
      { title: 'hello', url: '/hello' },
      { title: 'world', url: '/hello/world' },
    ],
  },
  users: {
    user: {
      fullname: 'Volto User',
    },
    reset: {
      loading: '',
    },
  },
  clipboard: {},
  actions: {
    actions: {},
  },
  content: { get: {} },
};

export default class Wrapper extends Component {
  render() {
    const store = configureStore()(initialState);
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <StaticRouter>
            <div className="volto-rsg-container">{this.props.children}</div>
          </StaticRouter>
        </IntlProvider>
      </Provider>
    );
  }
}
