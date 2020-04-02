import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Sitemap from './Sitemap';

const mockStore = configureStore();

describe('Sitemap', () => {
  it('renders a sitemap component', () => {
    const store = mockStore();
    const component = renderer.create(
      <Provider store={store}>
        <Sitemap location={{}} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
