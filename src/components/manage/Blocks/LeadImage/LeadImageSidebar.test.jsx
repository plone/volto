import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import LeadImageSidebar from './LeadImageSidebar';

const mockStore = configureStore();

test('renders a Lead Image block Sidebar component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <LeadImageSidebar
        data={{}}
        properties={{
          image: {
            scales: {
              mini: {
                download: 'image.png',
              },
            },
          },
          image_caption: 'alternate text',
        }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        onChangeField={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
