import React from 'react';
import renderer from 'react-test-renderer';
import EmailWidget from './EmailWidget';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  userSession: {
    token: '12345',
  },
});

describe('EmailWidget', () => {
  it('renders an empty email view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <EmailWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an email view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <EmailWidget className="metadata" value="foo@bar.com" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an email view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <EmailWidget className="metadata" value="foo@bar.com">
          {(child) => <strong>{child}</strong>}
        </EmailWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
