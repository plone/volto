import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';

import SelectWidget from './SelectWidget';

const mockStore = configureStore();

test('renders a select widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    vocabularies: {
      'plone.app.vocabularies.Keywords': {
        items: [{ title: 'My item', value: 'myitem' }],
        itemsTotal: 1,
      },
    },
  });

  const { container } = render(
    <Provider store={store}>
      <SelectWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText('My field'));
  expect(container).toMatchSnapshot();
});
