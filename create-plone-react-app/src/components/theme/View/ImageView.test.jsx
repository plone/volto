import React from 'react';
import renderer from 'react-test-renderer';
import ImageView from './ImageView';

test('renders an image view component', () => {
  const component = renderer.create(
    <ImageView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        image: {
          scales: {
            preview: {
              download: 'file:///preview.jpg',
            },
          },
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
