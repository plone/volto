import React from 'react';
import renderer from 'react-test-renderer';
import FileView from './FileView';

test('renders a file view component', () => {
  const component = renderer.create(
    <FileView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        file: {
          download: 'file:///preview.pdf',
          filename: 'preview.pdf',
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
