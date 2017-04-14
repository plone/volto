import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Navigation from './Navigation';

const mockStore = configureStore();

describe('Navigation', () => {
  it('renders a navigation component', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Navigation pathname="/blog" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
