import React from 'react';
import renderer from 'react-test-renderer';
import SearchWidget from './SearchWidget';

test('renders a not found component', () => {
  const component = renderer.create(<SearchWidget />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
