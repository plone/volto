import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlockChooser from './BlockChooser';

const mockStore = configureStore();

test('renders a BlockChooser component', () => {
  const store = mockStore({
    sidebar: {
      blockData: null,
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <BlockChooser onMutateBlock={() => {}} currentBlock="theblockid" />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
