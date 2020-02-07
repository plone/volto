import React from 'react';
import renderer from 'react-test-renderer';
import DatetimeWidget from './DatetimeWidget';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

test('renders a datetime widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <DatetimeWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value={moment('2019-10-21').toISOString()}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
