import React from 'react';
import renderer from 'react-test-renderer';
import Logo from './Logo';

test('renders a logo component', () => {
  const component = renderer.create(
    <Logo />
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
