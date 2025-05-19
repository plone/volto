import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import RegistryImageWidget from './RegistryImageWidget';
import config from '@plone/volto/registry';

vi.spyOn(global.Date, 'now').mockImplementation(() => 1234567890);

const mockStore = configureStore();

beforeAll(() => {
  config.settings.publicURL = 'http://localhost:3000';
});

const createStore = () =>
  mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

describe('RegistryImageWidget', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    Object.defineProperty(global.Image.prototype, 'complete', {
      get() {
        return true;
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders an empty file widget component', async () => {
    const store = createStore();

    const { container } = render(
      <Provider store={store}>
        <RegistryImageWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
        />
      </Provider>,
    );

    await waitFor(
      () => {
        expect(container.querySelector('.file-widget-dropzone')).toBeTruthy();
      },
      { timeout: 1000 },
    );

    expect(container).toMatchSnapshot();
  });

  test('renders a file widget component with value', async () => {
    const store = createStore();

    const { container } = render(
      <Provider store={store}>
        <RegistryImageWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          value={
            'filenameb64:bG9nby5jYWI5NDVkOC5zdmc=;datab64:PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1OC4yNTNweCIgaGVpZ2h0PSI0MC42ODZweCIgdmlld0JveD0iMCAwIDE1OC4yNTMgNDAuNjg2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNTguMjUzIDQwLjY4NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiAgICAgICAgICAgICAgICAgICAgPGc+PHBhdGggZmlsbD0iIzAwODZDMyIgZD0iTTY1LjMyNywyMy4yMDhoLTYuNTg5djExLjM4OGgtNC4zOTNWNS42MzhoMTAuOTgxYzUuNjUzLDAsOS4yNzEsMy43NDIsOS4yNzEsOC43ODUgICAgICAgICAgICAgICAgIFM3MC45NzksMjMuMjA4LDY1LjMyNywyMy4yMDh6IE02NS4wODIsOS41ODNoLTYuMzQ1djkuNjM5aDYuMzQ1YzMuMDUsMCw1LjEyNC0xLjc0OSw1LjEyNC00Ljc5OSAgICAgICAgICAgICAgICAgQzcwLjIwNiwxMS4zNzIsNjguMTMyLDkuNTgzLDY1LjA4Miw5LjU4M3oiLz48L3c+'
          }
        />
      </Provider>,
    );

    await waitFor(
      () => {
        const dropzone = container.querySelector('.file-widget-dropzone');
        const preview = container.querySelector('.image-preview');
        const filename = container.querySelector('.field-file-name');

        return dropzone && preview && filename;
      },
      { timeout: 1000 },
    );

    expect(container).toMatchSnapshot();
  });
});
