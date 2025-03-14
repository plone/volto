import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UniversalLink from './UniversalLink';
import config from '@plone/volto/registry';

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

global.console.error = jest.fn();

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

  it('renders a UniversalLink component if no external(href) link passed', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            item={{
              '@id': 'http://localhost:3000/en/welcome-to-volto',
            }}
          >
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

  it('check UniversalLink renders ext link for blacklisted urls', () => {
    config.settings.externalRoutes = [
      {
        match: {
          path: '/external-app',
          exact: true,
          strict: false,
        },
        url(payload) {
          return payload.location.pathname;
        },
      },
    ];

    const { getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            href="http://localhost:3000/external-app"
            title="Blacklisted route"
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTitle('Blacklisted route').getAttribute('target')).toBe(
      '_blank',
    );
  });

  it('UniversalLink renders external link where link is blacklisted', () => {
    const notInEN =
      /^(?!.*(#|\/en|\/static|\/controlpanel|\/cypress|\/login|\/logout|\/contact-form)).*$/;
    config.settings.externalRoutes = [
      {
        match: {
          path: notInEN,
          exact: false,
          strict: false,
        },
        url(payload) {
          return payload.location.pathname;
        },
      },
    ];

    const { getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            href="http://localhost:3000/blacklisted-app"
            title="External blacklisted app"
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );

    expect(getByTitle('External blacklisted app').getAttribute('target')).toBe(
      '_blank',
    );
    expect(getByTitle('External blacklisted app').getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
  });

  it('check UniversalLink does not break with error in item', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UniversalLink
            item={{
              error: 'Error while fetching content',
              message: 'Something went wrong',
            }}
          >
            <h1>Title</h1>
          </UniversalLink>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    expect(global.console.error).toHaveBeenCalled();
  });

  it('renders forced <a> tag with rel attribute when forceA is true', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UniversalLink href="/content" forceA={true} openLinkInNewTab={true}>
          Forced Link
        </UniversalLink>
      </Provider>,
    );
    const linkElement = getByText('Forced Link');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/content');
    expect(linkElement).toHaveAttribute('target', '_blank');
    // Verify that the rel property is set correctly for security
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

it('renders a UniversalLink component when url ends with @@display-file', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <UniversalLink href="http://localhost:3000/en/welcome-to-volto/@@display-file">
          <h1>Title</h1>
        </UniversalLink>
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
