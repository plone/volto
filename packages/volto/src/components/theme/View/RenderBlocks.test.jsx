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

test('Filters out invalid blocks', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { queryAllByText, queryByText } = render(
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
            items: [
              'MISSING-YOU-1',
              'a',
              'MISSING-YOU-2',
              null,
              undefined,
              'undefined',
            ],
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
  // Invalid blocks (missing from blocks object or invalid IDs) are filtered out and not rendered
  expect(
    queryAllByText('Invalid block - Will be removed on saving'),
  ).toHaveLength(0);
  // Only valid blocks are rendered
  expect(queryByText('id: a - text: bar - path: /foo')).not.toBeNull();
});
