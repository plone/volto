import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ArrayWidget from './ArrayWidget';

const mockStore = configureStore();

test('renders an array widget component', () => {
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
      <ArrayWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        items={{ vocabulary: { '@id': 'plone.app.vocabularies.Keywords' } }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
