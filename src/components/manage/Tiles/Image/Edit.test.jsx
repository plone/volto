import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

test('renders an edit image tile component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ url: 'image' }}
        selected={false}
        tile="1234"
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
        pathname="/news"
        onChangeTile={() => {}}
        onSelectTile={() => {}}
        onDeleteTile={() => {}}
        createContent={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
