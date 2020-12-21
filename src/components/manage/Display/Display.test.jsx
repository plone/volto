import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

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

    const { act } = renderer;
    let component = renderer.create(
      <Provider store={store}>
        <Display pathname="/test" />
      </Provider>,
    );

    await act(async () => {});

    expect(component.toJSON()).toMatchSnapshot();
  });
});
