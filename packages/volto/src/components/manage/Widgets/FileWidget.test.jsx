import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FileWidget from './FileWidget';

jest.spyOn(global.Date, 'now').mockImplementation(() => '0');

const mockStore = configureStore();

describe('FileWidget', () => {
  test('renders an empty file widget component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <FileWidget
          id="empty-file-widget"
          title="Empty File Widget"
          fieldSet="default"
          onChange={() => {}}
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders a file widget component with value', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <FileWidget
          id="file-widget-with-value"
          title="File Widget With Value"
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

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders a file widget component with value in raw data', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <FileWidget
          id="file-widget-raw-data"
          title="File Widget With Raw Data"
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

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
});
