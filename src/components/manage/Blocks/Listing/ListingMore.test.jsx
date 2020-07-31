import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ListingMore from './ListingMore';

const mockStore = configureStore();

test('renders an Listing Data Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    querystring: { sortable_indexes: {} },
  });
  const component = renderer.create(
    <Provider store={store}>
      <ListingMore
        id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
        data={{
          '@type': 'listing',
          query: [
            {
              i: 'review_state',
              o: 'plone.app.querystring.operation.selection.any',
              v: ['private'],
            },
          ],
        }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
