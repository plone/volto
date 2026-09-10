import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {
  PluggablesProvider,
  Pluggable,
} from '@plone/volto/components/manage/Pluggable';
import config from '@plone/volto/registry';
import ContainerBlockEdit from './Edit';

const mockStore = configureStore();

const DummyEdit = () => <div className="dummy-content" />;

// The container imports the loadable BlocksForm from the Form barrel; use the
// real BlocksForm component instead
vi.mock('@plone/volto/components/manage/Form', async () => {
  const actual = await vi.importActual(
    '@plone/volto/components/manage/Blocks/Block/BlocksForm',
  );
  return {
    BlocksForm: actual.default,
    BlockDataForm: () => <div />,
  };
});

vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import('@plone/volto/helpers/Loadable/__mocks__/Loadable.jsx');
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

let mockSerial = 0;
vi.mock('uuid', () => ({
  v4: vi.fn().mockImplementation(() => `pasted-uuid-${mockSerial++}`),
}));

const innerBlocks = {
  a: { '@type': 'dummy' },
  b: { '@type': 'dummy' },
  c: { '@type': 'dummy' },
};

const containerData = {
  '@type': 'testContainer',
  blocks: innerBlocks,
  blocks_layout: { items: ['a', 'b', 'c'] },
};

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();

  config.blocks.blocksConfig.dummy = { id: 'dummy', edit: DummyEdit };
  config.blocks.blocksConfig.testContainer = {
    id: 'testContainer',
    allowedBlocks: ['dummy'],
    blocksConfig: {
      dummy: config.blocks.blocksConfig.dummy,
    },
    blockSchema: () => ({
      title: 'Test container',
      fieldsets: [],
      properties: {},
    }),
    dataAdapter: () => {},
  };
});

afterAll(() => {
  delete config.blocks.blocksConfig.dummy;
  delete config.blocks.blocksConfig.testContainer;
});

const renderContainer = ({ clipboard = {}, wrapInBlock = false } = {}) => {
  const store = mockStore({
    blocksClipboard: clipboard,
    form: { ui: { selected: 'container-1', gridSelected: null } },
    sidebar: { tab: 0 },
    intl: { locale: 'en', messages: {} },
  });

  const onChangeBlock = jest.fn();

  const containerElement = (
    <ContainerBlockEdit
      block="container-1"
      data={containerData}
      onChangeBlock={onChangeBlock}
      onChangeField={jest.fn()}
      pathname="/test"
      selected
      manage={false}
      properties={{}}
    />
  );

  const rendered = render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <PluggablesProvider>
          <Pluggable name="main.toolbar.bottom">
            {(pluggables) => (
              <>
                {pluggables.map((p) => (
                  <span key={p.id}>{p()}</span>
                ))}
              </>
            )}
          </Pluggable>
          {wrapInBlock ? (
            <div className="block gridBlock">{containerElement}</div>
          ) : (
            containerElement
          )}
        </PluggablesProvider>
      </IntlProvider>
    </Provider>,
  );

  return {
    ...rendered,
    root: rendered.container,
    store,
    onChangeBlock,
    // The block content divs, one per inner block in layout order. The
    // `.block.dummy` elements would also match the cell drag wrappers
    innerBlockElements: rendered.container.querySelectorAll('.dummy-content'),
    cellWrappers: rendered.container.querySelectorAll('.cell-wrapper'),
  };
};

describe('Container block nested multi-selection', () => {
  it('selects a contiguous Shift-click range of inner blocks', () => {
    const { root, innerBlockElements } = renderContainer();

    fireEvent.click(innerBlockElements[0]);
    fireEvent.click(innerBlockElements[2], { shiftKey: true });

    expect(root.querySelectorAll('.block.multiSelected')).toHaveLength(3);
  });

  it('toggles inner blocks in the multi-selection with Control-click', () => {
    const { root, innerBlockElements } = renderContainer();

    fireEvent.click(innerBlockElements[0], { ctrlKey: true });
    fireEvent.click(innerBlockElements[2], { ctrlKey: true });

    expect(root.querySelectorAll('.block.multiSelected')).toHaveLength(2);

    fireEvent.click(innerBlockElements[2], { ctrlKey: true });

    expect(root.querySelectorAll('.block.multiSelected')).toHaveLength(1);
  });

  it('extends the multi-selection from the cell wrapper (cell padding)', () => {
    const { root, innerBlockElements, cellWrappers } = renderContainer();

    fireEvent.click(innerBlockElements[0]);
    fireEvent.click(cellWrappers[2], { shiftKey: true });

    expect(root.querySelectorAll('.block.multiSelected')).toHaveLength(3);
  });

  it('selects the cell from its padding even under a container .block ancestor', () => {
    // This mirrors the real Grid structure, where the page-level grid block
    // (.block.gridBlock) is an ancestor of the cell wrappers
    const { root, cellWrappers, innerBlockElements } = renderContainer({
      wrapInBlock: true,
    });

    fireEvent.click(cellWrappers[0]);
    expect(root.querySelectorAll('.block.dummy.selected')).toHaveLength(1);

    fireEvent.click(innerBlockElements[2], { shiftKey: true });
    expect(root.querySelectorAll('.block.multiSelected')).toHaveLength(3);
  });
});

describe('Container block clipboard toolbar', () => {
  it('shows the copy/cut/delete buttons only for a multi-selection', () => {
    const { innerBlockElements } = renderContainer();

    // Single selection: no clipboard buttons
    fireEvent.click(innerBlockElements[0]);
    expect(screen.queryByLabelText('Copy blocks')).toBeNull();
    expect(screen.queryByLabelText('Cut blocks')).toBeNull();
    expect(screen.queryByLabelText('Delete blocks')).toBeNull();

    // Multi-selection: clipboard buttons appear
    fireEvent.click(innerBlockElements[2], { shiftKey: true });
    expect(screen.getByLabelText('Copy blocks')).toBeTruthy();
    expect(screen.getByLabelText('Cut blocks')).toBeTruthy();
    expect(screen.getByLabelText('Delete blocks')).toBeTruthy();
  });

  it('copies the multi-selected inner blocks to the clipboard', () => {
    const { innerBlockElements, store } = renderContainer();

    fireEvent.click(innerBlockElements[0]);
    fireEvent.click(innerBlockElements[2], { shiftKey: true });
    fireEvent.click(screen.getByLabelText('Copy blocks'));

    const action = store
      .getActions()
      .find((a) => a.type === 'SET_BLOCKS_CLIPBOARD' && a.copy);

    expect(action.copy).toEqual([
      ['a', { '@type': 'dummy' }],
      ['b', { '@type': 'dummy' }],
      ['c', { '@type': 'dummy' }],
    ]);
  });

  it('pastes clipboard blocks after the selected inner block', () => {
    const { innerBlockElements, onChangeBlock, store } = renderContainer({
      clipboard: {
        copy: [['x-1', { '@type': 'dummy' }]],
      },
    });

    fireEvent.click(innerBlockElements[1]);
    fireEvent.click(screen.getByLabelText('Paste blocks'));

    expect(
      store.getActions().some((a) => a.type === 'RESET_BLOCKS_CLIPBOARD'),
    ).toBe(true);

    expect(onChangeBlock).toHaveBeenCalledTimes(1);
    const [blockId, newData] = onChangeBlock.mock.calls[0];
    expect(blockId).toBe('container-1');
    expect(Object.keys(newData.blocks)).toHaveLength(4);
    // The pasted block (with a fresh id) is inserted right after the
    // selected inner block 'b'
    const items = newData.blocks_layout.items;
    expect(items).toHaveLength(4);
    expect(items.slice(0, 2)).toEqual(['a', 'b']);
    expect(items[2]).toMatch(/^pasted-uuid-/);
    expect(items[3]).toBe('c');
  });

  it('cuts the multi-selected inner blocks out of the container', () => {
    const { innerBlockElements, onChangeBlock, store } = renderContainer();

    fireEvent.click(innerBlockElements[0]);
    fireEvent.click(innerBlockElements[2], { shiftKey: true });
    fireEvent.click(screen.getByLabelText('Cut blocks'));

    const action = store
      .getActions()
      .find((a) => a.type === 'SET_BLOCKS_CLIPBOARD' && a.cut);

    expect(action.cut).toHaveLength(3);

    expect(onChangeBlock).toHaveBeenCalledWith('container-1', {
      '@type': 'testContainer',
      blocks: {},
      blocks_layout: { items: [] },
    });
  });

  it('deletes the multi-selected inner blocks', () => {
    const { innerBlockElements, onChangeBlock } = renderContainer();

    fireEvent.click(innerBlockElements[0]);
    fireEvent.click(innerBlockElements[1], { shiftKey: true });
    fireEvent.click(screen.getByLabelText('Delete blocks'));

    expect(onChangeBlock).toHaveBeenCalledWith('container-1', {
      '@type': 'testContainer',
      blocks: { c: { '@type': 'dummy' } },
      blocks_layout: { items: ['c'] },
    });
  });
});
