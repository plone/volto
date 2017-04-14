import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Actions from './Actions';

const mockStore = configureStore();

describe('Actions', () => {
  it('renders an actions component', () => {
    const store = mockStore({ clipboard: {} });
    const component = renderer.create(
      <Provider store={store}>
        <Actions pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
