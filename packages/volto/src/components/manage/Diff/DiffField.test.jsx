import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';
import DiffField from './DiffField';

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await __setLoadables();
});

const mockStore = configureStore();

describe('DiffField', () => {
  it('renders a diff field in split mode', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Title', type: 'string' }}
          one="My old string"
          two="My new string"
          view="split"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a diff field in unified mode', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Title', type: 'string' }}
          one="My old string"
          two="My new string"
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a richtext field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ widget: 'richtext', title: 'Text', type: 'string' }}
          one={{ data: 'My old string' }}
          two={{ data: 'My new string' }}
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a datetime field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ widget: 'datetime', title: 'Text', type: 'string' }}
          one="2017-04-25T16:14:18+02:00"
          two="2016-04-25T16:14:18+02:00"
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a textarea field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ widget: 'textarea', title: 'Text', type: 'string' }}
          one="My old string"
          two="My new string"
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a boolean field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Text', type: 'boolean' }}
          one
          two={false}
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a boolean field with inverse values', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Text', type: 'boolean' }}
          one={false}
          two
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders an array field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Text', type: 'array' }}
          one={['one', 'two']}
          two={['one', 'three']}
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders an array of objects field', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <DiffField
          pathname="/blog"
          schema={{ title: 'Text', type: 'array' }}
          one={[
            { title: 'one', token: 'one' },
            { title: 'two', token: 'two' },
          ]}
          two={[
            { title: 'one', token: 'one' },
            { title: 'three', token: 'three' },
          ]}
          view="unified"
        />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });
});
