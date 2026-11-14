import React from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import config from '@plone/volto/registry';
import { Edit } from './Edit';

const blockId = 'block-id';
const TestBlock = () => <div data-testid="test-block" />;
const NestedContainerBlock = () => (
  <div>
    <div className="blocks-form">
      <div className="block child" data-testid="nested-child" />
    </div>
  </div>
);

const renderEdit = (extraProps = {}) => {
  const onSelectBlock = jest.fn();

  const result = render(
    <Edit
      type="test"
      data={{ '@type': 'test' }}
      properties={{}}
      selected={false}
      multiSelected={false}
      index={0}
      id={blockId}
      manage={false}
      editable
      pathname="/test"
      onMoveBlock={jest.fn()}
      onDeleteBlock={jest.fn()}
      onSelectBlock={onSelectBlock}
      handleKeyDown={jest.fn()}
      setSidebarTab={jest.fn()}
      setUIState={jest.fn()}
      intl={{ formatMessage: jest.fn() }}
      hovered={null}
      sidebarTab={0}
      {...extraProps}
    />,
  );

  return {
    ...result,
    block: result.getByRole('presentation'),
    onSelectBlock,
  };
};

describe('Block Edit modified mouse selection', () => {
  beforeAll(() => {
    config.blocks.blocksConfig.test = {
      edit: TestBlock,
      sidebarTab: 0,
    };
  });

  afterAll(() => {
    delete config.blocks.blocksConfig.test;
  });

  it.each([
    ['Shift', { shiftKey: true }],
    ['Control', { ctrlKey: true }],
    ['Meta', { metaKey: true }],
  ])(
    'prevents %s-mousedown from focusing an unselected block first',
    (_modifier, eventInit) => {
      const { block } = renderEdit();
      const event = createEvent.mouseDown(block, {
        bubbles: true,
        cancelable: true,
        ...eventInit,
      });

      fireEvent(block, event);

      expect(event.defaultPrevented).toBe(true);
    },
  );

  it('does not prevent an ordinary mousedown', () => {
    const { block } = renderEdit();
    const event = createEvent.mouseDown(block, {
      bubbles: true,
      cancelable: true,
    });

    fireEvent(block, event);

    expect(event.defaultPrevented).toBe(false);
  });

  it('does not prevent modified mousedown on the already selected block', () => {
    const { block } = renderEdit({ selected: true });
    const event = createEvent.mouseDown(block, {
      bubbles: true,
      cancelable: true,
      metaKey: true,
    });

    fireEvent(block, event);

    expect(event.defaultPrevented).toBe(false);
  });

  it('preserves ordinary focus selection for keyboard navigation', () => {
    const { block, onSelectBlock } = renderEdit();

    fireEvent.focus(block);

    expect(onSelectBlock).toHaveBeenCalledWith(
      blockId,
      undefined,
      expect.objectContaining({ type: 'focus' }),
    );
  });

  it('preserves modified click selection after mousedown focus is suppressed', () => {
    const { block, onSelectBlock } = renderEdit();

    fireEvent.click(block, { metaKey: true });

    expect(onSelectBlock).toHaveBeenCalledWith(
      blockId,
      true,
      expect.objectContaining({ type: 'click' }),
    );
  });

  it('forwards a modified click on the active block for promotion', () => {
    const { block, onSelectBlock } = renderEdit({ selected: true });

    fireEvent.click(block, { metaKey: true });

    expect(onSelectBlock).toHaveBeenCalledWith(
      blockId,
      true,
      expect.objectContaining({ type: 'click' }),
    );
  });
});

describe('Container block nested form events', () => {
  beforeAll(() => {
    config.blocks.blocksConfig.nestedContainer = {
      edit: NestedContainerBlock,
      sidebarTab: 0,
    };
  });

  afterAll(() => {
    delete config.blocks.blocksConfig.nestedContainer;
  });

  const renderContainer = (extraProps = {}) =>
    renderEdit({ type: 'nestedContainer', ...extraProps });

  it('activates the container singly when a nested form child is focused', () => {
    const { onSelectBlock, getByTestId } = renderContainer();

    fireEvent.focus(getByTestId('nested-child'));

    expect(onSelectBlock).toHaveBeenCalledWith(blockId, false);
  });

  it('activates the container singly when a nested form child is clicked', () => {
    const { onSelectBlock, getByTestId } = renderContainer();

    fireEvent.click(getByTestId('nested-child'));

    expect(onSelectBlock).toHaveBeenCalledWith(blockId, false);
  });

  it.each([
    ['Control', { ctrlKey: true }],
    ['Meta', { metaKey: true }],
    ['Shift', { shiftKey: true }],
  ])(
    'activates the container without forwarding a child %s event',
    (_modifier, eventInit) => {
      const { onSelectBlock, getByTestId } = renderContainer();

      fireEvent.click(getByTestId('nested-child'), eventInit);

      expect(onSelectBlock).toHaveBeenCalledWith(blockId, false);
    },
  );

  it.each([
    ['Control', { ctrlKey: true }],
    ['Meta', { metaKey: true }],
    ['Shift', { shiftKey: true }],
  ])(
    'does not apply child %s selection to an active container',
    (_modifier, eventInit) => {
      const { onSelectBlock, getByTestId } = renderContainer({
        selected: true,
      });

      fireEvent.click(getByTestId('nested-child'), eventInit);

      expect(onSelectBlock).not.toHaveBeenCalled();
    },
  );

  it('does not prevent modified mousedown inside a nested form', () => {
    const { getByTestId } = renderContainer();
    const nestedChild = getByTestId('nested-child');
    const event = createEvent.mouseDown(nestedChild, {
      bubbles: true,
      cancelable: true,
      metaKey: true,
    });

    fireEvent(nestedChild, event);

    expect(event.defaultPrevented).toBe(false);
  });

  it('still selects the container when its own chrome is clicked', () => {
    const { block, onSelectBlock } = renderContainer();

    fireEvent.click(block);

    expect(onSelectBlock).toHaveBeenCalledWith(
      blockId,
      false,
      expect.objectContaining({ type: 'click' }),
    );
  });

  it('still forwards a modified click on the container chrome', () => {
    const { block, onSelectBlock } = renderContainer({ selected: true });

    fireEvent.click(block, { metaKey: true });

    expect(onSelectBlock).toHaveBeenCalledWith(
      blockId,
      true,
      expect.objectContaining({ type: 'click' }),
    );
  });

  it('still prevents modified mousedown on the unselected container chrome', () => {
    const { block } = renderContainer();
    const event = createEvent.mouseDown(block, {
      bubbles: true,
      cancelable: true,
      metaKey: true,
    });

    fireEvent(block, event);

    expect(event.defaultPrevented).toBe(true);
  });
});
