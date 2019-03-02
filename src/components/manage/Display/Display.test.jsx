import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Display from './Display';

const mockStore = configureStore();

describe('Display', () => {
  it('renders an actions component', () => {
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
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
