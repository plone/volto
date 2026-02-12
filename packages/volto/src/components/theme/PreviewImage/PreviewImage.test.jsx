import React from 'react';
import { render } from '@testing-library/react';

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
    const { container } = render(<PreviewImage item={item} alt={item.title} />);
    expect(container.firstChild).toMatchSnapshot();
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
    const { container } = render(
      <PreviewImage item={item} alt={item.title} className="extra" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a fallback image', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const { container } = render(<PreviewImage item={item} alt={item.title} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a fallback image with extra props', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const { container } = render(
      <PreviewImage item={item} alt={item.title} className="extra" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop empty', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const { container } = render(
      <PreviewImage item={item} className="extra" alt="" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const { container } = render(
      <PreviewImage item={item} className="extra" alt="Alt prop" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('not renders a fallback image if showDefault prop is false', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const { container } = render(
      <PreviewImage
        item={item}
        className="extra"
        showDefault={false}
        alt={item.title}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
