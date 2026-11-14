import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Field } from '@plone/volto/components/manage/Form';
import ModalForm from './ModalForm';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');

const schema = {
  title: 'Dialog',
  fieldsets: [{ id: 'default', title: 'Default', fields: ['title'] }],
  properties: {
    title: { title: 'Title', type: 'string' },
  },
  required: [],
};

describe('ModalForm field ids', () => {
  it('gives each dialog field a namespaced id, so it cannot collide with a page field', () => {
    const store = mockStore({ intl: { locale: 'en', messages: {} } });
    render(
      <Provider store={store}>
        {/* A field of the page's form, with the same name as the dialog's */}
        <input id="field-title" name="title" aria-label="Page title" />
        <ModalForm
          open
          title="Dialog"
          schema={schema}
          formData={{ title: 'Draft' }}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );

    const props = Field.mock.calls[Field.mock.calls.length - 1][0];
    expect(props.id).toBe('modal-title');
    expect(props.fieldName).toBe('title');
    expect(props.value).toBe('Draft');
  });

  it('writes a change of a dialog field to the field name, not to the namespaced id', () => {
    const store = mockStore({ intl: { locale: 'en', messages: {} } });
    const onSubmit = vi.fn();
    render(
      <Provider store={store}>
        <ModalForm
          open
          title="Dialog"
          schema={schema}
          formData={{ title: 'Draft' }}
          onSubmit={onSubmit}
          onCancel={() => {}}
        />
      </Provider>,
    );

    const props = Field.mock.calls[Field.mock.calls.length - 1][0];
    act(() => {
      props.onChange('modal-title', 'New title');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit.mock.calls[0][0]).toEqual({ title: 'New title' });
  });
});
