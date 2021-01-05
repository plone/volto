import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{}}
      properties={{
        image: {
          'content-type': 'image/jpeg',
          download:
            'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
          filename: 'image.jpg',
          height: 1280,
          scales: {
            icon: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 21,
              width: 32,
            },
            large: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 512,
              width: 768,
            },
            listing: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 10,
              width: 16,
            },
            mini: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 133,
              width: 200,
            },
            preview: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 266,
              width: 400,
            },
            thumb: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 85,
              width: 128,
            },
            tile: {
              download:
                'http://localhost:8080/Plone/test-images/@@images/image.jpeg',
              height: 42,
              width: 64,
            },
          },
          size: 186918,
          width: 1920,
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
