import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Breadcrumbs from './Breadcrumbs';

const mockStore = configureStore();

describe('Breadcrumbs', () => {
  it('renders a breadcrumbs component', () => {
    const store = mockStore({
      breadcrumbs: {
        items: [
          { title: 'Blog', url: '/blog' },
          { title: 'My first blog', url: '/blog/my-first-blog' },
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Breadcrumbs pathname="/blog" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
