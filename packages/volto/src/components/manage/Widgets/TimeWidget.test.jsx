import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import TimeWidget from './TimeWidget';
import { waitFor, render, screen } from '@testing-library/react';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders a time widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { container } = render(
    <Provider store={store}>
      <TimeWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        value={'12:00'}
      />
    </Provider>,
  );
  await waitFor(() => screen.getByText(/My field/));
  expect(container).toMatchSnapshot();
});
