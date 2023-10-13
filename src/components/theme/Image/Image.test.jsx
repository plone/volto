import React from 'react';
import renderer from 'react-test-renderer';
import Image from './Image';

test('renders an image component with fetchpriority high', () => {
  const component = renderer.create(
    <Image
      item={{
        '@id': 'http://localhost:3000/image',
        image: {
          download: 'http://localhost:3000/image/@@images/image.png',
          width: 400,
          height: 400,
          scales: {
            preview: {
              download: 'http://localhost:3000/image/@@images/image-400.png',
              width: 400,
              height: 400,
            },
          },
        },
      }}
      imageField="image"
      alt="alt text"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an image component with lazy loading', () => {
  const component = renderer.create(
    <Image
      item={{
        '@id': 'http://localhost:3000/image',
        image: {
          download: 'http://localhost:3000/image/@@images/image.png',
          width: 400,
          height: 400,
          scales: {
            preview: {
              download: 'http://localhost:3000/image/@@images/image-400.png',
              width: 400,
              height: 400,
            },
          },
        },
      }}
      imageField="image"
      alt="alt text"
      loading="lazy"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an image component with responsive class', () => {
  const component = renderer.create(
    <Image
      item={{
        '@id': 'http://localhost:3000/image',
        image: {
          download: 'http://localhost:3000/image/@@images/image-1200.png',
          width: 400,
          height: 400,
          scales: {
            preview: {
              download: 'http://localhost:3000/image/@@images/image-400.png',
              width: 400,
              height: 400,
            },
          },
        },
      }}
      imageField="image"
      alt="alt text"
      responsive={true}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an image component from a catalog brain', () => {
  const component = renderer.create(
    <Image
      item={{
        '@id': 'http://localhost:3000/image',
        image_field: 'image',
        image_scales: {
          image: [
            {
              download: '@@images/image.png',
              width: 400,
              height: 400,
              scales: {
                preview: {
                  download: '@@images/image-400.png',
                  width: 400,
                  height: 400,
                },
              },
            },
          ],
        },
      }}
      imageField="image"
      alt="alt text"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an image component from a string src', () => {
  const component = renderer.create(
    <Image
      src="http://localhost:3000/image/@@images/image/image.png"
      alt="alt text"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
