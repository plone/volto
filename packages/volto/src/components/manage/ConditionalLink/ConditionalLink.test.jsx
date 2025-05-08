import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

import ConditionalLink from './ConditionalLink';

const mockStore = configureStore();
const store = mockStore({
  userSession: {
    token: null,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('ConditionalLink', () => {
  it('renders a link when condition is true', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink to="/test" condition={true}>
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json.type).toBe('a');
    expect(json.props.href).toBe('/test');
    expect(json.children[0]).toBe('Link Text');
  });

  it('renders a span when condition is false', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink to="/test" condition={false}>
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('passes additional props when rendering a link', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink
            to="/test"
            condition={true}
            className="custom-class"
            data-test="test-id"
          >
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json.props.className).toBe('custom-class');
    expect(json.props['data-test']).toBe('test-id');
  });

  it('renders a component if no external(href) link passed', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink
            condition={true}
            item={{
              '@id': 'http://localhost:3000/en/welcome-to-volto',
            }}
          >
            <h1>Title</h1>
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
