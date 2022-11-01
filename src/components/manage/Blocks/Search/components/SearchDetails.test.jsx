import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import SearchDetails from './SearchDetails';

const mockStore = configureStore();

describe('SearchDetails', () => {
  it('renders search detail component', () => {
    const store = mockStore({
      userSession: { token: null },
      content: { data: { '@id': 'myid' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <SearchDetails
          text="test"
          total="10"
          data={{ showTotalResults: true }}
        ></SearchDetails>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
