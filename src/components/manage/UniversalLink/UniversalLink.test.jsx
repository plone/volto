import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UniversalLink from './UniversalLink';

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

describe('UniversalLink', () => {
  it('renders a UniversalLink component with internal link', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink href={'/en/welcome-to-volto'}>
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a UniversalLink component with external link', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink href="https://github.com/plone/volto">
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('check UniversalLink set rel attribute for ext links', () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            href="https://github.com/plone/volto"
            title="Volto GitHub repository"
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTitle('Volto GitHub repository').getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
  });

  it('check UniversalLink set target attribute for ext links', () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            href="https://github.com/plone/volto"
            title="Volto GitHub repository"
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTitle('Volto GitHub repository').getAttribute('target')).toBe(
      '_blank',
    );
  });

  it('check UniversalLink can unset target for ext links with prop', () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            href="https://github.com/plone/volto"
            title="Volto GitHub repository"
            openLinkInNewTab={false}
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTitle('Volto GitHub repository').getAttribute('target')).toBe(
      null,
    );
  });
});
