import React from 'react';
import renderer from 'react-test-renderer';
import AlbumView from './AlbumView';

import config from '@plone/volto/registry';

config.settings.imageScales = {
  large: 768,
  preview: 400,
  mini: 200,
  thumb: 128,
  tile: 64,
  icon: 32,
  listing: 16,
};

test('renders an gallery view component', () => {
  const component = renderer.create(
    <AlbumView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        items: [
          {
            '@id': 'http://localhost:3000/news',
            url: '/news',
            image: {
              download: 'file:///preview.jpg',
              scales: {
                preview: {
                  download: 'file:///preview.jpg',
                },
                large: {
                  download: 'file:///preview.jpg',
                },
              },
            },
            image_field: 'image',
          },
          {
            '@id': 'http://localhost:3000/events',
            url: '/events',
            image: {
              download: 'file:///preview.jpg',
              scales: {
                preview: {
                  download: 'file:///preview.jpg',
                },
                large: {
                  download: 'file:///preview.jpg',
                },
              },
            },
            image_field: 'image',
          },
        ],
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
