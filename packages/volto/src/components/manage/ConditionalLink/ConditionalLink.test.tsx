import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

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
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink to="/test" condition={true}>
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );

    const link = screen.getByText('Link Text');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders a link when condition is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink href="/test" condition={true}>
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );

    const link = screen.getByText('Link Text');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders a span when condition is false', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalLink to="/test" condition={false}>
            Link Text
          </ConditionalLink>
        </MemoryRouter>
      </Provider>,
    );

    const span = screen.getByText('Link Text');
    expect(span.tagName).toBe('DIV');
  });

  it('passes additional props when rendering a link', () => {
    render(
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

    const link = screen.getByText('Link Text');
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveAttribute('data-test', 'test-id');
  });

  it('renders a component if no external (href) link is passed', () => {
    render(
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

    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H1');
  });
});
