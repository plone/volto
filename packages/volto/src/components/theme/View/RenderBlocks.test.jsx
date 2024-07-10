import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import RenderBlocks from './RenderBlocks';
import { render } from '@testing-library/react';

import config from '@plone/volto/registry';

const mockStore = configureStore();

test('Allows override of blocksConfig', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <RenderBlocks
        blocksConfig={{
          ...config.blocks.blocksConfig,
          custom: {
            id: 'custom',
            view: ({ id, data }) => (
              <div>
                {id} - {data.text}
              </div>
            ),
          },
        }}
        content={{
          blocks_layout: {
            items: ['a', 'b'],
          },
          blocks: {
            a: {
              '@type': 'custom',
              text: 'a',
            },
            b: {
              '@type': 'custom',
              text: 'b',
            },
          },
        }}
      />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});

test('Provides path to blocks', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { container } = render(
    <Provider store={store}>
      <RenderBlocks
        blocksConfig={{
          ...config.blocks.blocksConfig,
          custom: {
            id: 'custom',
            view: ({ id, data, path }) => (
              <div>
                id: {id} - text: {data.text} - path: {path}
              </div>
            ),
          },
        }}
        content={{
          blocks_layout: {
            items: ['a'],
          },
          blocks: {
            a: {
              '@type': 'custom',
              text: 'bar',
            },
          },
        }}
        path="/foo"
      />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});

test('Renders invalid blocks', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { queryAllByText } = render(
    <Provider store={store}>
      <RenderBlocks
        blocksConfig={{
          ...config.blocks.blocksConfig,
          custom: {
            id: 'custom',
            view: ({ id, data, path }) => (
              <div>
                id: {id} - text: {data.text} - path: {path}
              </div>
            ),
          },
        }}
        content={{
          blocks_layout: {
            items: ['MISSING-YOU-1', 'a', 'MISSING-YOU-2'],
          },
          blocks: {
            a: {
              '@type': 'custom',
              text: 'bar',
            },
          },
        }}
        path="/foo"
      />
    </Provider>,
  );
  expect(
    queryAllByText('Invalid block - Will be removed on saving'),
  ).toHaveLength(2);
});
