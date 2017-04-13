import React from 'react';
import renderer from 'react-test-renderer';
import WysiwygWidget from './WysiwygWidget';

global.__SERVER__ = true; // eslint no-underscore-dangle: 0

test('renders a wysiwyg widget component', () => {
  const component = renderer.create(
    <WysiwygWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
