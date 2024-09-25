import React from 'react';
import renderer from 'react-test-renderer';
import AlbumView from './AlbumView';

test('renders an gallery view component', () => {
  const component = renderer.create(
    <AlbumView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        items: [
          {
            url: '/news',
            image: {
              scales: {
                preview: {
                  download: 'file:///preview.jpg',
                },
                large: {
                  download: 'file:///preview.jpg',
                },
              },
            },
          },
          {
            url: '',
            image: {
              scales: {
                preview: {
                  download: 'file:///preview.jpg',
                },
                large: {
                  download: 'file:///preview.jpg',
                },
              },
            },
          },
        ],
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
