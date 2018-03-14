import React from 'react';
import renderer from 'react-test-renderer';
import Edit from './Edit';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders a wysiwyg widget component', () => {
  const component = renderer.create(
    <Edit data={{ text: '<p>body text</p>' }} onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
