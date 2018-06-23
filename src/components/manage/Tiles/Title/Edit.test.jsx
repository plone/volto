import React from 'react';
import renderer from 'react-test-renderer';
import Edit from './Edit';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders an edit title tile component', () => {
  const component = renderer.create(
    <Edit properties={{ title: 'My Title' }} onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
