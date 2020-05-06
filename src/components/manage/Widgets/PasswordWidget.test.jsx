import React from 'react';
import renderer from 'react-test-renderer';
import PasswordWidget from './PasswordWidget';

test('renders a password widget component', () => {
  const component = renderer.create(
    <PasswordWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
      onBlur={() => {}}
      onClick={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
