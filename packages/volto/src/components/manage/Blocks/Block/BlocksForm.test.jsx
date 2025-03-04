import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlocksForm from './BlocksForm';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

config.experimental = { addBlockButton: { enabled: false } };

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await __setLoadables();
});

let mockSerial = 0;
vi.mock('uuid', () => {
  return {
    v4: vi.fn().mockImplementation(() => `id-${mockSerial++}`),
  };
});

vi.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) =>
    children({
      innerRef: () => {},
      droppableProps: {},
      placeholder: <div />,
    }),
  Draggable: ({ children }) =>
    children({
      innerRef: () => {},
      draggableProps: {},
      dragHandleProps: {},
    }),
}));

vi.mock('./Order/Order', () => ({
  __esModule: true,
  default: () => <div>Order Component</div>,
}));

const mockStore = configureStore();

test('Allow override of blocksConfig', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    form: {
      ui: {},
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
      <div>
        <BlocksForm {...data} />
        <div id="sidebar-order"></div>
      </div>
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
    form: {
      ui: {},
    },
  });

  const onChangeFormData = vi.fn(() => {});

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
      <div>
        <BlocksForm {...data} />
        <div id="sidebar-order"></div>
      </div>
    </Provider>,
  );

  expect(onChangeFormData).toHaveBeenCalledWith({
    blocks: {
      a: { '@type': 'custom', text: 'a' },
      b: { '@type': 'custom', text: 'b' },
    },
    blocks_layout: { items: ['a', 'b', 'MISSING-YOU-1'] },
  });

  expect(onChangeFormData).toHaveBeenCalledWith({
    blocks: {
      a: { '@type': 'custom', text: 'a' },
      b: { '@type': 'custom', text: 'b' },
    },
    blocks_layout: { items: ['a', 'b', 'MISSING-YOU-2'] },
  });
});
