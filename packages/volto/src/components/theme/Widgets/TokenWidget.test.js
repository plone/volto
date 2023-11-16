import React from 'react';
import renderer from 'react-test-renderer';
import TokenWidget from './TokenWidget';
import { MemoryRouter } from 'react-router-dom';
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

describe('TokenWidget', () => {
  it('renders an empty tags view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <TokenWidget />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders tags view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <TokenWidget className="meta tags" value={['foo', 'bar']} />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders tags view widget component with children', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <TokenWidget className="meta tags" value={['foo', 'bar']}>
            {(child) => <strong>{child}</strong>}
          </TokenWidget>
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
