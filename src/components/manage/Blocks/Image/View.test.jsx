import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import View from './View';

import config from '@plone/volto/registry';

config.settings.imageScales = {
  large: 768,
  preview: 400,
  mini: 200,
  thumb: 128,
  tile: 64,
  icon: 32,
  listing: 16,
};
const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('Image View Component', () => {
  test('renders a view image component with a local image', () => {
    const { getByRole } = render(<View data={{ url: '/image.jpg' }} />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', '/image.jpg/@@images/image/listing');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
  test('renders a view image component with a local image with a link', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={{ url: '/image.jpg', href: '/front-page' }} />
        </MemoryRouter>
      </Provider>,
    );
    const img = getByRole('img');
    const a = container.querySelector('a');
    expect(img).toHaveAttribute('src', '/image.jpg/@@images/image/listing');
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
            href: 'http://front-page',
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
