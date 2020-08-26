import moment from 'moment-timezone';
import TimePicker from 'rc-time-picker';
import React from 'react';
import { Provider } from 'react-intl-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { settings } from '~/config';
import DatetimeWidget from './DatetimeWidget';

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

test('datetime widget converts UTC date and adapt to local datetime', () => {
  settings.timezone = 'ETC/GMT-2';
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
        value={'2020-02-10T15:01:00.000Z'}
      />
    </Provider>,
  );
  const componentInstance = component.root;
  const componentTimeInput = componentInstance.findByType(TimePicker);

  expect(componentTimeInput.props.defaultValue.toISOString(true)).toBe(
    moment.tz('2020-02-10T17:01:00', settings.timezone).toISOString(true),
  );
});
