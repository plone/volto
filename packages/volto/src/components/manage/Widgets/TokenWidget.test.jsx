import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';
import TokenWidget from './TokenWidget';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await __setLoadables();
});

test('renders a token widget component', async () => {
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
  const component = renderer.create(
    <Provider store={store}>
      <TokenWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        items={{ vocabulary: { '@id': 'plone.app.vocabularies.Keywords' } }}
      />
    </Provider>,
  );

  await waitFor(() => {});
  expect(component.toJSON()).toMatchSnapshot();
});
