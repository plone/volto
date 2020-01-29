import React from 'react';
import renderer from 'react-test-renderer';
import { wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

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

  const component = renderer.create(
    <Provider store={store}>
      <SelectWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  await wait(() => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
