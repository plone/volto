import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import SchemaWidget from './SchemaWidget';

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

const mockStore = configureStore();

test('renders a schema widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <SchemaWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value={'{"fieldsets": [{"fields": []}]}'}
      />
    </Provider>,
  );

  expect(container).toMatchSnapshot();
});
