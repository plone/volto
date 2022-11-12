import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';

import ArrayWidget from './ArrayWidget';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders an array widget component', async () => {
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
      <ArrayWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        items={{ vocabulary: { '@id': 'plone.app.vocabularies.Keywords' } }}
      />
    </Provider>,
  );
  await waitFor(() => {});
  expect(container).toMatchSnapshot();
});
