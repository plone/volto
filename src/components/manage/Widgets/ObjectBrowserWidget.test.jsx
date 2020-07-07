import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ObjectBrowserWidget from './ObjectBrowserWidget';

const mockStore = configureStore();
test('renders a objectBrowser widget component', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <ObjectBrowserWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
