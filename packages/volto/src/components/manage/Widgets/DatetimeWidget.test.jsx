import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import DatetimeWidget from './DatetimeWidget';
import { waitFor, render, screen } from '@testing-library/react';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

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

test('datetime widget converts UTC date and adapt to local datetime', async () => {
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
