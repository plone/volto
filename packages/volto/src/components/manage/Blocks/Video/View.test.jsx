import { Provider } from 'react-intl-redux';
import renderer from 'react-test-renderer';
import View from './View';
import config from '@plone/volto/registry';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

config.blocks.blocksConfig = {
  video: {
    id: 'video',
    title: 'Video',
    group: 'media',
    extensions: {},
    variations: [],
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

test('renders a view video component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <View
        data={{
          '@type': 'video',
          url: 'https://youtu.be/KqjeO_ekW3g',
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a view video component with placeholder', () => {
  const component = renderer.create(
    <Provider store={store}>
      <View
        data={{
          '@type': 'video',
          url: 'https://youtu.be/KqjeO_ekW3g',
          preview_image:
            'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
