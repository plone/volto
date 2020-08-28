import React from 'react';
import { Provider } from 'react-intl-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import SchemaWidget from './SchemaWidget';

const mockStore = configureStore();
const intl = {
  locale: 'en',
  messages: {},
  formatMessage: () => {},
};

test('renders a schema widget component', () => {
  const store = mockStore({
    intl,
  });

  const component = renderer.create(
    <Provider store={store}>
      <SchemaWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value={'{"fieldsets": [{"fields": []}]}'}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
