import React from 'react';
import renderer from 'react-test-renderer';
import TileRenderer from './TileRenderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders a text tile component using the tile renderer', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <TileRenderer
        data={{ url: 'heroimage.jpg' }}
        tile="thetileid"
        edit
        type="text"
        selected={false}
        onChangeTile={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
