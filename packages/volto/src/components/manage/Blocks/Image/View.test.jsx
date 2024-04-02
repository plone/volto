import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { getImageBlockSizes } from './utils';
import config from '@plone/volto/registry';
import { View } from './View';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

config.blocks.blocksConfig = {
  image: {
    id: 'image',
    title: 'Image',
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
    getSizes: getImageBlockSizes,
  },
};

describe('Image View Component', () => {
  test('renders a view image component with a local image', () => {
    const { getByRole } = render(<View data={{ url: '/image.jpg' }} />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', '/image.jpg/@@images/image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
  test('renders a view image component with a local image with a link', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View
            data={{ url: '/image.jpg', href: [{ '@id': '/front-page' }] }}
          />
        </MemoryRouter>
      </Provider>,
    );
    const img = getByRole('img');
    const a = container.querySelector('a');
    expect(img).toHaveAttribute('src', '/image.jpg/@@images/image');
    expect(a).toHaveAttribute('href', '/front-page');
  });
  test('renders a view image component with an external image', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <View data={{ url: 'https://plone.org/logo.jpg' }} />
      </Provider>,
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://plone.org/logo.jpg');
  });
  test('renders a view image component with an external image with a link', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <View
          data={{
            url: 'https://plone.org/logo.jpg',
            href: [{ '@id': 'http://front-page' }],
          }}
        />
      </Provider>,
    );
    const img = getByRole('img');
    const a = container.querySelector('a');
    expect(img).toHaveAttribute('src', 'https://plone.org/logo.jpg');
    expect(a).toHaveAttribute('href', 'http://front-page');
  });
});
