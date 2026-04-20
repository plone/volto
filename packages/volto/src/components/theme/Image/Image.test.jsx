import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, screen } from '@testing-library/react';

import Image from './Image';

const mockStore = configureStore();

const defaultSiteData = {
  'plone.image_scales': { preview: {}, listing: {} },
};

const itemWithImage = {
  '@id': 'http://localhost:3000/image',
  image: {
    download: 'http://localhost:3000/image/@@images/image.png',
    width: 1080,
    height: 920,
    scales: {
      preview: {
        download: 'http://localhost:3000/image/@@images/image-400.png',
        width: 400,
        height: 400,
      },
    },
  },
};

const catalogBrain = {
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
};

const previewImageLink = {
  '@id': 'http://localhost:3000/blog/blog-post',
  image_field: 'preview_image_link',
  image_scales: {
    preview_image_link: [
      {
        base_path: '/image.png',
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
};

const renderImage = (props, { siteData = defaultSiteData } = {}) => {
  const store = mockStore({
    intl: { locale: 'en', messages: {} },
    site: { data: siteData },
  });

  return render(
    <Provider store={store}>
      <Image {...props} />
    </Provider>,
  );
};

describe('Image', () => {
  it('renders an image component with fetchpriority high', () => {
    renderImage({ item: itemWithImage, imageField: 'image', alt: 'alt text' });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('width', '1080');
    expect(img).toHaveAttribute('height', '920');
    expect(img).toHaveAttribute('src', '/image/@@images/image.png');
    expect(img).toHaveAttribute(
      'srcset',
      '/image/@@images/image-400.png 400w, /image/@@images/image.png 1080w',
    );
  });

  it('renders an image component with lazy loading', () => {
    renderImage({
      item: itemWithImage,
      imageField: 'image',
      alt: 'alt text',
      loading: 'lazy',
    });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).not.toHaveAttribute('fetchpriority');
  });

  it('renders an image component with responsive class', () => {
    renderImage({
      item: {
        ...itemWithImage,
        image: {
          ...itemWithImage.image,
          download: 'http://localhost:3000/image/@@images/image-1200.png',
        },
      },
      imageField: 'image',
      alt: 'alt text',
      responsive: true,
    });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveClass('responsive');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders an image component from a catalog brain', () => {
    renderImage({ item: catalogBrain, imageField: 'image', alt: 'alt text' });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute('src', '/image/@@images/image.png');
    expect(img).toHaveAttribute(
      'srcset',
      '/image/@@images/image-400.png 400w, /image/@@images/image.png 400w',
    );
  });

  it('renders an image component from a catalog brain using `preview_image_link`', () => {
    renderImage({
      item: previewImageLink,
      imageField: 'preview_image_link',
      alt: 'alt text',
    });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute('src', '/image.png/@@images/image.png');
    expect(img).toHaveAttribute(
      'srcset',
      '/image.png/@@images/image-400.png 400w, /image.png/@@images/image.png 400w',
    );
  });

  it('includes the original scale in srcset when site defines more scales than the image', () => {
    renderImage(
      {
        item: previewImageLink,
        imageField: 'preview_image_link',
        alt: 'alt text',
      },
      { siteData: { 'plone.image_scales': { preview: {}, listing: {} } } },
    );

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute(
      'srcset',
      '/image.png/@@images/image-400.png 400w, /image.png/@@images/image.png 400w',
    );
  });

  it('does not include the original scale when site scales are not greater than the image scales', () => {
    renderImage(
      {
        item: previewImageLink,
        imageField: 'preview_image_link',
        alt: 'alt text',
      },
      { siteData: { 'plone.image_scales': { preview: {} } } },
    );

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute(
      'srcset',
      '/image.png/@@images/image-400.png 400w',
    );
  });

  it('does not render when no item or src is provided', () => {
    const { container } = renderImage(
      { alt: 'missing image' },
      { siteData: {} },
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders an svg image without srcset', () => {
    renderImage({
      item: {
        ...itemWithImage,
        image: {
          ...itemWithImage.image,
          'content-type': 'image/svg+xml',
        },
      },
      imageField: 'image',
      alt: 'svg image',
    });

    const img = screen.getByAltText('svg image');

    expect(img).not.toHaveAttribute('srcset');
    expect(img).toHaveAttribute('src', '/image/@@images/image.png');
  });

  it('merges custom className with responsive flag', () => {
    renderImage({
      item: itemWithImage,
      imageField: 'image',
      alt: 'with class',
      responsive: true,
      className: 'custom-class',
    });

    const img = screen.getByAltText('with class');

    expect(img).toHaveClass('custom-class');
    expect(img).toHaveClass('responsive');
  });

  it('renders an image component from a string src', () => {
    renderImage({
      src: 'http://localhost:3000/image/@@images/image/image.png',
      alt: 'alt text',
    });

    const img = screen.getByAltText('alt text');

    expect(img).toHaveAttribute(
      'src',
      'http://localhost:3000/image/@@images/image/image.png',
    );
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('should not render empty class attribute in img tag', () => {
    renderImage({ src: '/image.png', alt: 'no class attribute' });

    const img = screen.getByAltText('no class attribute');

    expect(img).not.toHaveAttribute('class');
  });
});
