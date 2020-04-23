import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { wait } from '@testing-library/react';

import Display from './Display';

const mockStore = configureStore();

describe('Display', () => {
  it('renders an actions component', async () => {
    const store = mockStore({
      content: {
        update: { loaded: true },
        data: { layout: 'summary_view', '@type': 'Folder' },
      },
      schema: {
        schema: {
          layouts: ['summary_view'],
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Display pathname="/test" />
      </Provider>,
    );
    await wait(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
