import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlocksForm from './BlocksForm';
import { render } from '@testing-library/react';

import config from '@plone/volto/registry';

config.experimental = { addBlockButton: { enabled: false } };

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

let mockSerial = 0;

jest.mock('uuid', () => {
  return {
    v4: jest.fn().mockImplementation(() => `id-${mockSerial++}`),
  };
});

const mockStore = configureStore();

test('Allow override of blocksConfig', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const data = {
    pathname: '/test',
    properties: {
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
    },
    selectedBlock: 'a',
    title: 'Edit blocks',
    metadata: {},
    blocksConfig: {
      ...config.blocks.blocksConfig,
      custom: {
        id: 'custom',
        edit: ({ id, data }) => (
          <div>
            {id} - {data.text}
          </div>
        ),
      },
    },
  };

  const { container } = render(
    <Provider store={store}>
      <BlocksForm {...data} />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});

test('Removes invalid blocks on saving', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const onChangeFormData = jest.fn(() => {});

  const data = {
    pathname: '/test',
    properties: {
      blocks_layout: {
        items: ['a', 'b', 'MISSING-YOU-1', 'MISSING-YOU-2'],
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
    },
    selectedBlock: 'a',
    title: 'Edit blocks',
    metadata: {},
    blocksConfig: {
      ...config.blocks.blocksConfig,
      custom: {
        id: 'custom',
        edit: ({ id, data }) => (
          <div>
            {id} - {data.text}
          </div>
        ),
      },
    },
    onChangeFormData,
  };

  render(
    <Provider store={store}>
      <BlocksForm {...data} />
    </Provider>,
  );
  expect(onChangeFormData).toBeCalledWith({
    blocks: {
      a: { '@type': 'custom', text: 'a' },
      b: { '@type': 'custom', text: 'b' },
    },
    blocks_layout: { items: ['a', 'b', 'MISSING-YOU-1'] },
  });
  expect(onChangeFormData).toBeCalledWith({
    blocks: {
      a: { '@type': 'custom', text: 'a' },
      b: { '@type': 'custom', text: 'b' },
    },
    blocks_layout: { items: ['a', 'b', 'MISSING-YOU-2'] },
  });
});
