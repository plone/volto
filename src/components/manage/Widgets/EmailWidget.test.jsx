import React from 'react';
import renderer from 'react-test-renderer';
import EmailWidget from './EmailWidget';

test('renders an email widget component', () => {
  const component = renderer.create(
    <EmailWidget
      id="test-email"
      title="My Email"
      onChange={() => {}}
      onBlur={() => {}}
      onClick={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
