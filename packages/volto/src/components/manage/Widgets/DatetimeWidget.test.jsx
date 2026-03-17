import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import DatetimeWidget from './DatetimeWidget';
import { waitFor, render, screen } from '@testing-library/react';

const mockStore = configureStore();

test('renders a datetime widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const isoDate = new Date('2019-10-21').toISOString();
  const { container } = render(
    <Provider store={store}>
      <DatetimeWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        value={isoDate}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText(/My field/));
  expect(container).toMatchSnapshot();
});

test('datetime widget converts UTC date and adapts to local datetime', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const date = '2020-02-10T15:01:00.000Z';
  const { container } = render(
    <Provider store={store}>
      <DatetimeWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value={date}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText(/My field/));
  expect(container).toMatchSnapshot();
});

test('renders a date-only widget when dateOnly is true', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <DatetimeWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value="2020-02-10"
        dateOnly
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText(/My field/));
  expect(container).toMatchSnapshot();
});

test('returns null when open_end and id is end', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <DatetimeWidget
        id="end"
        title="End"
        onChange={() => {}}
        value="2020-02-10T15:01:00.000Z"
        formData={{ open_end: true }}
      />
    </Provider>,
  );

  expect(container.innerHTML).toBe('');
});
