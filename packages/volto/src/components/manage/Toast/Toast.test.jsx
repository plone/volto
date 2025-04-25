import React from 'react';
import renderer from 'react-test-renderer';
import Toast from './Toast';

test('renders a Toast info component', () => {
  const component = renderer.create(
    <Toast
      info
      title="I'm a title"
      content="This is the content, lorem ipsum"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
