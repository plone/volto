import React from 'react';
import renderer from 'react-test-renderer';
import DocumentView from './DocumentView';

test('renders a document view component', () => {
  const component = renderer.create(
    <DocumentView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        text: {
          data: '<p>Hello World!',
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
