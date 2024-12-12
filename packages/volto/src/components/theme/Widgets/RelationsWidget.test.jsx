import React from 'react';
import renderer from 'react-test-renderer';
import RelationsWidget from './RelationsWidget';
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

describe('RelationsWidget', () => {
  it('renders an empty relations view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationsWidget />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a simple relations view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationsWidget className="metadata" value={['foo', 'bar']} />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a vocabulary relations view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationsWidget
            className="metadata"
            value={[{ title: 'Foo' }, { title: 'Bar' }]}
          />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full vocabulary array view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationsWidget
            className="metadata"
            value={[
              { title: 'Foo', token: 'foo' },
              { title: 'Bar', token: 'bar' },
            ]}
          />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full vocabulary relations view widget component with children', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <RelationsWidget
            className="metadata"
            value={[
              {
                title: 'Foo',
                token: 'foo',
                '@id': '/foo-page',
                '@type': 'Foo',
                review_state: 'private',
                description: 'A Foo',
              },
              {
                title: 'Bar',
                token: 'bar',
                '@id': '/bar-page',
                '@type': 'Bar',
                review_state: 'published',
                description: 'A Bar',
              },
            ]}
          >
            {(child) => <strong>{child}</strong>}
          </RelationsWidget>
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
