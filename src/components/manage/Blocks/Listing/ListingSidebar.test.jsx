import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, wait } from '@testing-library/react';

import ListingSidebar from './ListingSidebar';

const mockStore = configureStore();

test('renders a Listing Block Sidebar component', async () => {
  const store = mockStore({
    querystring: { sortable_indexes: {} },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { container } = render(
    <Provider store={store}>
      <ListingSidebar
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
  await wait(() => {
    expect(container.firstChild).toMatchSnapshot();
  });
});
