import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import TileChooser from './TileChooser';

const mockStore = configureStore();

test('renders a TileChooser component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <TileChooser onMutateTile={() => {}} currentTile="thetileid" />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
