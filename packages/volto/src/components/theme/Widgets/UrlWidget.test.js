import React from 'react';
import renderer from 'react-test-renderer';
import UrlWidget from './UrlWidget';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

const store = mockStore({
  userSession: {
    token: '',
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('UrlWidget', () => {
  it('renders an empty URL view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <UrlWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an URL view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <UrlWidget className="metadata" value="http://foobar.com" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an URL view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <UrlWidget className="metadata" value="http://foobar.com">
          {(child) => <strong>{child}</strong>}
        </UrlWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
