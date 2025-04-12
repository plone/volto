import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UniversalLink, { __test } from './UniversalLink';
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
          <UniversalLink
            href="https://github.com/plone/volto"
            className="custom-link"
          >
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

  test('only one UniversalLink re-renders when prop changes (stable references)', () => {
    const renderCounter = jest.fn();
    __test.renderCounter = renderCounter;

    const itemA = { '@id': '/en/a' };
    const itemB = { '@id': '/en/b' };
    const itemC = { '@id': '/en/c' };

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    const { rerender } = render(
      <>
        <UniversalLink item={itemA} />
        <UniversalLink item={itemB} />
        <UniversalLink item={itemC} />
      </>,
      { wrapper: Wrapper },
    );

    // expect 3 renders
    expect(renderCounter).toHaveBeenCalledTimes(3);

    const updatedItemB = { '@id': '/en/b-updated' };

    rerender(
      <>
        <UniversalLink item={itemA} />
        <UniversalLink item={updatedItemB} />
        <UniversalLink item={itemC} />
      </>,
    );

    // expect 4 renders (only one UniversalLink re-renders)
    expect(renderCounter).toHaveBeenCalledTimes(4);
  });

  test('only one UniversalLink re-renders when prop changes (with children - stable references)', () => {
    const renderCounter = jest.fn();
    __test.renderCounter = renderCounter;

    const itemA = { '@id': '/en/a' };
    const itemB = { '@id': '/en/b' };
    const itemC = { '@id': '/en/c' };
    const title = 'Title';

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    const { rerender } = render(
      <>
        <UniversalLink item={itemA}>{title}</UniversalLink>
        <UniversalLink item={itemB}>{title}</UniversalLink>
        <UniversalLink item={itemC}>{title}</UniversalLink>
      </>,
      { wrapper: Wrapper },
    );

    // expect 3 renders
    expect(renderCounter).toHaveBeenCalledTimes(3);

    const updatedItemB = { '@id': '/en/b-updated' };

    rerender(
      <>
        <UniversalLink item={itemA}>{title}</UniversalLink>
        <UniversalLink item={updatedItemB}>{title}</UniversalLink>
        <UniversalLink item={itemC}>{title}</UniversalLink>
      </>,
    );

    // expect 4 renders (only one UniversalLink re-renders)
    expect(renderCounter).toHaveBeenCalledTimes(4);
  });

  test('[NEGATIVE TEST] UniversalLink re-renders all instances when children are inline JSX (React.memo ineffective)', () => {
    // NEGATIVE TEST:
    // This test demonstrates that React.memo does NOT prevent re-renders
    // when props like `children` are passed as inline JSX.
    // This is expected behavior due to unstable object references.
    // Do NOT use inline props if render optimization is required.
    const renderCounter = jest.fn();
    __test.renderCounter = renderCounter;

    const itemA = { '@id': '/en/a' };
    const itemB = { '@id': '/en/b' };
    const itemC = { '@id': '/en/c' };

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    const { rerender } = render(
      <>
        <UniversalLink item={itemA}>
          <h1>Title</h1>
        </UniversalLink>
        <UniversalLink item={itemB}>
          <h1>Title</h1>
        </UniversalLink>
        <UniversalLink item={itemC}>
          <h1>Title</h1>
        </UniversalLink>
      </>,
      { wrapper: Wrapper },
    );

    // expect 3 renders
    expect(renderCounter).toHaveBeenCalledTimes(3);

    const updatedItemB = { '@id': '/en/b-updated' };

    rerender(
      <>
        <UniversalLink item={itemA}>
          <h1>Title</h1>
        </UniversalLink>
        <UniversalLink item={updatedItemB}>
          <h1>Title</h1>
        </UniversalLink>
        <UniversalLink item={itemC}>
          <h1>Title</h1>
        </UniversalLink>
      </>,
    );

    // expect 6 renders (React.memo does NOT prevent re-renders when props like `children` are passed as inline JSX.)
    expect(renderCounter).toHaveBeenCalledTimes(6);
  });

  test('[NEGATIVE TEST] UniversalLink re-renders all instances when props are inline JSX (React.memo ineffective)', () => {
    // NEGATIVE TEST:
    // This test demonstrates that React.memo does NOT prevent re-renders
    // when props like `item` are passed as inline object.
    // This is expected behavior due to unstable object references.
    // Do NOT use inline props if render optimization is required.
    const renderCounter = jest.fn();
    __test.renderCounter = renderCounter;

    const title = 'Title';

    const Wrapper = ({ children }) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    const { rerender } = render(
      <>
        <UniversalLink item={{ '@id': '/en/a' }}>{title}</UniversalLink>
        <UniversalLink item={{ '@id': '/en/b' }}>{title}</UniversalLink>
        <UniversalLink item={{ '@id': '/en/c' }}>{title}</UniversalLink>
      </>,
      { wrapper: Wrapper },
    );

    // expect 3 renders
    expect(renderCounter).toHaveBeenCalledTimes(3);

    rerender(
      <>
        <UniversalLink item={{ '@id': '/en/a' }}>{title}</UniversalLink>
        <UniversalLink item={{ '@id': '/en/b' }}>{title}</UniversalLink>
        <UniversalLink item={{ '@id': '/en/c' }}>{title}</UniversalLink>
      </>,
    );

    // expect 6 renders (React.memo does NOT prevent re-renders when props like `children` are passed as inline JSX.)
    expect(renderCounter).toHaveBeenCalledTimes(6);
  });
});
