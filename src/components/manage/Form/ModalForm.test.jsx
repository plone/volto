import React from 'react';
import renderer from 'react-test-renderer';
import ModalForm from './ModalForm';

jest.mock('./Field', () => jest.fn(() => <div className="Field" />));

describe('ModalForm', () => {
  it('renders a modal form component', () => {
    const component = renderer.create(
      <ModalForm
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
        onSubmit={() => {}}
        onCancel={() => {}}
        open={false}
        title="Rename items"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
