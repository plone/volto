import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import FileWidget from './FileWidget';

vi.spyOn(global.Date, 'now').mockImplementation(() => 1234567890);

const mockStore = configureStore();

const createStore = () =>
  mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

describe('FileWidget', () => {
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
        <FileWidget
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
        <FileWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          value={{
            download: 'http://myfile',
            'content-type': 'image/png',
            filename: 'myfile',
            encoding: '',
          }}
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

  test('renders a file widget component with value in raw data', async () => {
    const store = createStore();

    const { container } = render(
      <Provider store={store}>
        <FileWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          value={{
            data: 'oiweurtksdgfjaslfqw9523563456',
            'content-type': 'image/png',
            filename: 'myfile',
            encoding: 'base64',
          }}
        />
      </Provider>,
    );

    await waitFor(
      () => {
        const dropzone = container.querySelector('.file-widget-dropzone');
        const filename = container.querySelector('.field-file-name');

        return dropzone && filename;
      },
      { timeout: 1000 },
    );

    expect(container).toMatchSnapshot();
  });
});
