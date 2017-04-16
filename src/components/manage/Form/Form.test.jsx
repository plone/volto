import React from 'react';
import renderer from 'react-test-renderer';
import Form from './Form';

jest.mock('./Field', () => jest.fn(() => <div className="Field" />));

describe('Form', () => {
  it('renders a form component', () => {
    const component = renderer.create(
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
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
