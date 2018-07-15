import React from 'react';
import renderer from 'react-test-renderer';
import PasswordWidget from './PasswordWidget';

test('renders a password widget component', () => {
  const component = renderer.create(
    <PasswordWidget id="my-field" title="My field" onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
