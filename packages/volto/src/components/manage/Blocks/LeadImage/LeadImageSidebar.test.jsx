import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import LeadImageSidebar from './LeadImageSidebar';

jest.mock('@plone/volto/components/manage/Widgets');
jest.mock('@plone/volto/components/manage/Sidebar');

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
          '@id': 'http://localhost:3000/image.png',
          image: {
            download: 'http://localhost:3000/image.png/@@images/image-1200.png',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download:
                  'http://localhost:3000/image.png/@@images/image-400.png',
                width: 400,
                height: 400,
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
