import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import { When } from './EventDatesInfo';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});
test('different day, whole day', () => {
  const component = renderer.create(
    <Provider store={store}>
      <When
        start="2019-06-23T11:55:00+00:00"
        end="2019-06-24T15:20:00+00:00"
        whole_day={true}
        open_end={false}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('different day, not whole day', () => {
  const component = renderer.create(
    <Provider store={store}>
      <When
        start="2019-06-23T11:55:00+00:00"
        end="2019-06-24T15:20:00+00:00"
        whole_day={false}
        open_end={false}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('same day, whole day', () => {
  const component = renderer.create(
    <Provider store={store}>
      <When
        start="2019-06-23T11:55:00+00:00"
        end="2019-06-23T15:20:00+00:00"
        whole_day={true}
        open_end={false}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('same day, not whole day, open end', () => {
  const component = renderer.create(
    <Provider store={store}>
      <When
        start="2019-06-23T11:55:00+00:00"
        end="2019-06-23T15:20:00+00:00"
        whole_day={false}
        open_end={true}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('same day, not whole day, not open end', () => {
  const component = renderer.create(
    <Provider store={store}>
      <When
        start="2019-06-23T11:55:00+00:00"
        end="2019-06-23T15:20:00+00:00"
        whole_day={false}
        open_end={false}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
