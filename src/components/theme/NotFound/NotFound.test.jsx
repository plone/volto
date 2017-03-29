import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './NotFound';

test('renders a not found component', () => {
  const component = renderer.create(
    <NotFound />
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
