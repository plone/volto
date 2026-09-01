import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Form, { Form as FormComponent } from './Form';

const mockStore = configureStore();
const errorMessage =
  "[{'message': 'The specified email is not valid.', 'field': 'contact_email', 'error': 'ValidationError'}";

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});

describe('Form', () => {
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Form
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['title'],
              },
            ],
            properties: {
              title: {},
            },
            required: [],
          }}
          requestError={errorMessage}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

const layout = ['a', 'b', 'c', 'd'];

const selectBlock = ({
  id,
  selected = null,
  multiSelected = [],
  ctrlKey = false,
  metaKey = true,
  shiftKey = false,
}) => {
  const setUIState = jest.fn();
  const form = Object.create(FormComponent.prototype);
  form.state = {
    formData: {
      blocks: Object.fromEntries(
        layout.map((blockId) => [blockId, { '@type': 'slate' }]),
      ),
      blocks_layout: { items: layout },
    },
  };
  form.props = {
    uiState: { selected, multiSelected },
    setUIState,
    onSelectForm: null,
  };

  form.onSelectBlock(id, true, {
    ctrlKey,
    metaKey,
    shiftKey,
  });

  return setUIState.mock.calls[0][0];
};

describe('Form top-level block selection', () => {
  it.each([
    ['Meta', { metaKey: true }],
    ['Control', { ctrlKey: true, metaKey: false }],
  ])('promotes the active block with %s-click', (_modifier, eventModifiers) => {
    expect(selectBlock({ id: 'a', selected: 'a', ...eventModifiers })).toEqual({
      selected: null,
      multiSelected: ['a'],
      gridSelected: null,
    });
  });

  it('includes the active block when adding another block', () => {
    expect(selectBlock({ id: 'b', selected: 'a' }).multiSelected).toEqual([
      'a',
      'b',
    ]);
  });

  it('adds blocks without inserting null ghost selections', () => {
    expect(
      selectBlock({ id: 'c', multiSelected: ['a', 'b'] }).multiSelected,
    ).toEqual(['a', 'b', 'c']);
  });

  it('removes only the clicked multi-selection member', () => {
    expect(
      selectBlock({ id: 'b', multiSelected: ['a', 'b', 'c'] }).multiSelected,
    ).toEqual(['a', 'c']);
  });

  it('returns an empty selection after removing the final member', () => {
    expect(
      selectBlock({ id: 'a', multiSelected: ['a'] }).multiSelected,
    ).toEqual([]);
  });

  it('selects a contiguous Shift-click range from the active block', () => {
    const getSelection = vi
      .spyOn(window, 'getSelection')
      .mockReturnValue({ empty: vi.fn() });

    expect(
      selectBlock({
        id: 'd',
        selected: 'b',
        metaKey: false,
        shiftKey: true,
      }).multiSelected,
    ).toEqual(['b', 'c', 'd']);

    getSelection.mockRestore();
  });
});
