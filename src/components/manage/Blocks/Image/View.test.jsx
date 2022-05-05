import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { View } from './View';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

jest.mock('../../../../helpers/Extensions/withBlockExtensions', () => {
  const originalModule = jest.requireActual(
    '../../../../helpers/Extensions/withBlockExtensions',
  );
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Image View Component', () => {
  test('renders a view image component with a local image', () => {
    const { getByRole } = render(
      <View data={{ url: '/image.jpg' }} extensions={{}} variation={{}} />,
    );
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
