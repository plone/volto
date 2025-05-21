import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import MapsSidebar from './MapsSidebar';

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});

const mockStore = configureStore();

test('renders an Image Block Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MapsSidebar
        data={{ url: 'map' }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        resetSubmitUrl={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
