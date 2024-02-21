import React from 'react';
import renderer from 'react-test-renderer';

import PreviewImage from './PreviewImage';

describe('PreviewImage', () => {
  it('renders a preview image', () => {
    const item = {
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/image',
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
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} alt={item.title} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a preview image with extra props', () => {
    const item = {
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/image',
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
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} alt={item.title} className="extra" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} alt={item.title} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with extra props', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} alt={item.title} className="extra" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop empty', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" alt="" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" alt="Alt prop" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('not renders a fallback image if showDefault prop is false', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage
        item={item}
        className="extra"
        showDefault={false}
        alt={item.title}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
