import React from 'react';
import renderer from 'react-test-renderer';
import RelationWidget from './RelationWidget';
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

describe('RelationWidget', () => {
  it('renders an empty relation view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationWidget />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a relation view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationWidget className="metadata" value={{ title: 'Foo Bar' }} />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full relation view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationWidget
            className="metadata"
            value={{ title: 'Foo Bar', token: 'foobar', '@id': '/a-page' }}
          />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full relation view widget component with children', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationWidget
            className="metadata"
            value={{
              title: 'Foo Bar',
              token: 'foobar',
              '@id': '/a-page',
              '@type': 'Document',
              review_state: 'private',
              description: 'Bar Foo',
            }}
          >
            {(child) => <strong>{child}</strong>}
          </RelationWidget>
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
