import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import Sitemap from './Sitemap';

const mockStore = configureStore();

describe('Sitemap', () => {
  it('renders a sitemap component', () => {
    const store = mockStore({
      navigation: {
        url: 'http://localhost:8080/Plone/@navigation',
        items: [
          {
            url: 'http://localhost:8080/Plone/page-1',
            description: '',
            items: [
              {
                url: 'http://localhost:8080/Plone/page-1/page-1-2',
                description: '',
                title: 'Page 1-2',
              },
              {
                url: 'http://localhost:8080/Plone/page-1/page-1-3',
                description: '',
                title: 'Page 1-3',
              },
            ],
            title: 'Page 1-3',
          },
          {
            url: 'http://localhost:8080/Plone/page-2',
            description: '',
            title: 'Page 2',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Sitemap />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
