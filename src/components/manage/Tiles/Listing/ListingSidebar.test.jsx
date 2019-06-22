import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ListingSidebar from './ListingSidebar';

const mockStore = configureStore();
const baseStore = {
  intl: {
    locale: 'en',
    messages: {},
  },
};

test('renders the listing tile sidebar', () => {
  const store = mockStore(baseStore);
  const component = renderer.create(
    <Provider store={store}>
      <ListingSidebar data={{}} tile="test" onChangeTile={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
