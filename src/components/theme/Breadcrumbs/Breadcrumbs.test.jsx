import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { BrowserRouter as Router } from 'react-router-dom';
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
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Breadcrumbs pathname="/blog" />
        </Router>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
