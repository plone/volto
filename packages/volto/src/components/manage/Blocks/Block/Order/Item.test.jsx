import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';

import { Item } from './Item';

const mockStore = configureStore();

const defaultStoreState = {
  intl: {
    locale: 'en',
    messages: {},
  },
  form: {
    ui: {
      selected: null,
      hovered: null,
      multiSelected: [],
      gridSelected: null,
    },
  },
};

const renderItem = (data = {}) => {
  const store = mockStore(defaultStoreState);

  return render(
    <Provider store={store}>
      <Item
        id="title-block-id"
        data={{ '@type': 'title', ...data }}
        depth={0}
        indentationWidth={25}
        onRemove={() => {}}
        onSelectBlock={() => {}}
        handleProps={{}}
      />
    </Provider>,
  );
};

describe('Order Item', () => {
  let requiredBlocks;

  beforeEach(() => {
    requiredBlocks = [...(config.blocks.requiredBlocks || [])];
    config.blocks.requiredBlocks = [];
  });

  afterEach(() => {
    config.blocks.requiredBlocks = requiredBlocks;
  });

  test('renders drag and delete actions for movable and removable blocks', () => {
    const { container } = renderItem();

    expect(container.querySelector('.action.drag')).not.toBeNull();
    expect(container.querySelector('.action.delete')).not.toBeNull();
  });

  test('hides delete action for required blocks', () => {
    const { container } = renderItem({ required: true });

    expect(container.querySelector('.action.delete')).toBeNull();
  });

  test('hides delete action for block types configured as required', () => {
    config.blocks.requiredBlocks = ['title'];

    const { container } = renderItem();

    expect(container.querySelector('.action.delete')).toBeNull();
  });

  test('allows explicit required=false to override required block types', () => {
    config.blocks.requiredBlocks = ['title'];

    const { container } = renderItem({ required: false });

    expect(container.querySelector('.action.delete')).not.toBeNull();
  });

  test('hides drag action for fixed blocks', () => {
    const { container } = renderItem({ fixed: true });

    expect(container.querySelector('.action.drag')).toBeNull();
  });
});
