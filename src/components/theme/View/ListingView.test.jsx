import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ListingView from './ListingView';

const mockStore = configureStore();

describe('ListingView', () => {
  it('renders a listing_view component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ListingView
          content={{
            title: 'Hello World!',
            description: 'Hi',
            items: [
              {
                title: 'My item',
                description: 'My item description',
                url: 'http://item',
                '@type': 'Document',
              },
              {
                title: 'Second item',
                description: 'My second item description',
                url: 'http://item2',
                '@type': 'Document',
              },
            ],
          }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
