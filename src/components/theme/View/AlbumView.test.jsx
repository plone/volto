import React from 'react';
import renderer from 'react-test-renderer';

import AlbumView from './AlbumView';

describe('AlbumView', () => {
  it('renders a AlbumView view component', () => {
    const component = renderer.create(
      <AlbumView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          items: [
            {
              title: 'My item',
              description: 'My item description',
              url: 'http://item',
              image: {
                height: 100,
                width: 100,
                download: 'file:///image.jpg',
                scales: {
                  preview: {
                    download: 'file:///preview.jpg',
                  },
                },
              },
              image_caption: 'My image caption',
              '@type': 'News Item',
            },
          ],
        }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a AlbumView view component with SVGs', () => {
    const component = renderer.create(
      <AlbumView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          items: [
            {
              title: 'My item',
              description: 'My item description',
              url: 'http://item',
              image: {
                height: -1,
                width: -1,
                download: 'file:///image.svg',
                scales: {
                  preview: {
                    download: 'file:///preview.svg',
                  },
                },
              },
              image_caption: 'My image caption',
              '@type': 'News Item',
            },
          ],
        }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
