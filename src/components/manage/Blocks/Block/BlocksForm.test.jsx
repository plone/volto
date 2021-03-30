import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlocksForm from './BlocksForm';
import { render } from '@testing-library/react';

import config from '@plone/volto/registry';

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
