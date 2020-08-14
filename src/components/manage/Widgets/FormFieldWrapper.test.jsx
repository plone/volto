import React from 'react';
import renderer from 'react-test-renderer';
import FormFieldWrapper from './FormFieldWrapper';

test('renders a file widget component', () => {
  const component = renderer.create(
    <FormFieldWrapper
      id="my-field"
      title="My field"
      description="Test"
      onChange={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
      required={true}
      error={['error1']}
      value={true}
      wrapped={false}
      intl={{ formatMessage: () => {} }}
      fieldSet={null}
      draggable={true}
      isDisabled={false}
      columns={2}
      className="text"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
