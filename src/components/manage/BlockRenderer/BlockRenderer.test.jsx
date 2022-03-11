import React from 'react';
import renderer from 'react-test-renderer';
import BlockRenderer from './BlockRenderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';

const mockStore = configureStore();

beforeAll(() => {
  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    image: {
      id: 'image',
      title: 'Image',
      group: 'media',
      view: () => <div className="mocked-block-view-image" />,
      edit: () => <div className="mocked-block-edit-image" />,
      restricted: false,
      mostUsed: true,
      sidebarTab: 1,
      security: {
        addPermission: [],
        view: [],
      },
    },
  };
});

test('renders a text block component using the block renderer', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <BlockRenderer
        data={{ url: 'heroimage.jpg' }}
        block="theblockid"
        edit
        type="image"
        selected={false}
        onChangeBlock={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
