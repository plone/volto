import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './Avatar';

test('Renders avatar', () => {
  const component = renderer.create(
    <Avatar size={40} color="OrangeRed" title="John Smith" text="JS" />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
