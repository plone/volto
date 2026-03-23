import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import DatetimeWidget from './DatetimeWidget';
import { waitFor, render, screen } from '@testing-library/react';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

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
        showTime={true}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText(/My field/));
  await waitFor(() => screen.getByPlaceholderText('Time'));
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
        showTime={true}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText(/My field/));
  await waitFor(() => screen.getByPlaceholderText('Time'));
  expect(container).toMatchSnapshot();
});

test('applies aria-required attribute to the time input when required prop is true', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <DatetimeWidget
        id="required-field"
        title="Required Field"
        onChange={() => {}}
        required={true}
      />
    </Provider>,
  );

  // Wait for the lazy-loaded TimePicker to be mounted in the DOM
  await waitFor(() => screen.getByPlaceholderText('Time'));

  // The rc-time-picker doesn't support aria-required natively,
  // so we verify if our MutationObserver/useEffect successfully injected it.
  const timeInput = container.querySelector('.time-input input');

  expect(timeInput).toHaveAttribute('aria-required', 'true');
});
