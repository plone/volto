import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';

import IdWidget from './IdWidget';

const mockStore = configureStore();

describe('IdWidget', () => {
  test('renders an empty id widget component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      querystring: {
        indexes: {},
      },
    });
    config.settings = {
      reservedIds: ['login'],
    };

    const { container } = render(
      <Provider store={store}>
        <IdWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          onBlur={() => {}}
          onClick={() => {}}
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders an id widget with a valid value', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      querystring: {
        indexes: {},
      },
    });
    config.settings = {
      reservedIds: ['login'],
    };

    const { container } = render(
      <Provider store={store}>
        <IdWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          onBlur={() => {}}
          onClick={() => {}}
          value="test-id"
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders an id widget with a valid dot character', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      querystring: {
        indexes: {},
      },
    });
    config.settings = {
      reservedIds: ['login'],
    };

    const { container } = render(
      <Provider store={store}>
        <IdWidget
          id="my-field.jpg"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          onBlur={() => {}}
          onClick={() => {}}
          value="test-id"
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });

  test('renders an id widget with invalid characters', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      querystring: {
        indexes: {},
      },
    });
    config.settings = {
      reservedIds: ['login'],
    };

    const { container } = render(
      <Provider store={store}>
        <IdWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          onBlur={() => {}}
          onClick={() => {}}
          value="Test id"
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders an id widget with an reserved name', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      querystring: {
        indexes: {},
      },
    });
    config.settings = {
      reservedIds: ['login'],
    };

    const { container } = render(
      <Provider store={store}>
        <IdWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          onBlur={() => {}}
          onClick={() => {}}
          value="login"
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
});
