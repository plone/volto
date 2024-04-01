import React from 'react';
import { render } from '@testing-library/react';
import ContentMetadataTags from './ContentMetadataTags';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { Helmet } from '@plone/volto/helpers';
import { cloneDeep, find } from 'lodash';
import config from '@plone/volto/registry';

const mockStore = configureStore();

describe('ContentMetadataTags', () => {
  afterEach(() => {
    config.settings.contentMetadataTagsImageField = 'image';
    config.settings.internalApiPath = '';
  });

  const store = mockStore({
    router: {
      location: {
        pathname: '/path/to/content',
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
    site: {
      data: {
        'plone.site_title': 'Plone Site',
      },
    },
    content: {},
  });

  const testImage = {
    'content-type': 'image/jpeg',
    download:
      'http://localhost:3000/de/@@images/opengraph_image-2400-36c9291f7c2ee4c02709be0c43aec062.jpeg',
    filename: 'black-starry-night.jpg',
    height: 1708,
    scales: {
      large: {
        download:
          'http://localhost:3000/de/@@images/opengraph_image-800-535f044a9bcf34a6a107f6ec67c27af7.jpeg',
        height: '569',
        width: 800,
      },
    },
    size: 693013,
    width: 2400,
  };

  const testImageInFieldImage = {
    ...testImage,
    scales: {
      large: {
        ...testImage.scales.large,
        download: 'http://localhost:3000/de/@@images/imageInFieldImage',
      },
    },
  };

  const testImageInFieldPreviewImageLink = {
    image: cloneDeep(testImageInFieldImage),
  };
  testImageInFieldPreviewImageLink.image.scales.large.download =
    'http://localhost:3000/de/@@images/imageInFieldPreviewImageLink';

  const testImageInFieldPreviewImageLinkWithInternalURLs = {
    image: cloneDeep(testImageInFieldImage),
  };
  testImageInFieldPreviewImageLinkWithInternalURLs.image.scales.large.download =
    'http://backend:8080/Plone/de/@@images/imageInFieldPreviewImageLinkInternalURLs';

  it('renders metadata tags - SEO fields present', () => {
    const content = {
      title: 'Content Title',
      description: 'Content Description',
      opengraph_title: 'OpenGraph Title',
      opengraph_image: testImage,
      opengraph_description: 'OpenGraph Description',
      seo_title: 'SEO Title',
      seo_description: 'SEO Description',
      seo_canonical_url: 'https://example.com/canonical',
      seo_noindex: false,
    };

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogTitle = find(head.metaTags, { property: 'og:title' });
    const ogDescription = find(head.metaTags, { property: 'og:description' });
    const ogURL = find(head.metaTags, { property: 'og:url' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogTitle.content).toBe('OpenGraph Title');
    expect(ogDescription.content).toBe('OpenGraph Description');
    expect(ogURL.content).toBe('https://example.com/canonical');
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/opengraph_image-800-535f044a9bcf34a6a107f6ec67c27af7.jpeg',
    );
  });

  it('renders metadata tags - SEO field No Index present', () => {
    const content = {
      seo_noindex: true,
    };
    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const robots = find(head.metaTags, { name: 'robots' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(robots.content).toBe('noindex');
  });

  it('renders metadata tags - fallbacks - No opengraph_title but seo_title', () => {
    const content = {
      title: 'Content Title',
      seo_title: 'SEO Title',
    };

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const ogTitle = find(head.metaTags, { property: 'og:title' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogTitle.content).toBe('SEO Title');
  });

  it('renders metadata tags - fallbacks - No opengraph_title, no seo_title, but content title', () => {
    const content = {
      title: 'Content Title',
    };

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const ogTitle = find(head.metaTags, { property: 'og:title' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogTitle.content).toBe('Content Title');
  });

  it('renders Image metadata tags - OpenGraph image field present', () => {
    const content = {
      opengraph_image: testImage,
      image: testImageInFieldImage,
    };

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/opengraph_image-800-535f044a9bcf34a6a107f6ec67c27af7.jpeg',
    );
  });

  it('renders Image metadata tags - No OpenGraph image field present - Image in `image` field (leadimage behavior)', () => {
    const content = {
      image: testImageInFieldImage,
    };

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/imageInFieldImage',
    );
  });

  it('renders Image metadata tags - No OpenGraph image field present - Image in `preview_image` field (preview_image behavior)', () => {
    const content = {
      preview_image: testImageInFieldImage,
    };
    config.settings.contentMetadataTagsImageField = 'preview_image';

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/imageInFieldImage',
    );
  });

  it('renders Image metadata tags - No OpenGraph image field present - Image in `preview_image_link` field (preview_image_link behavior)', () => {
    const content = {
      preview_image_link: testImageInFieldPreviewImageLink,
    };
    config.settings.contentMetadataTagsImageField = 'preview_image_link';

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/imageInFieldPreviewImageLink',
    );
  });

  it('renders Image metadata tags - deals with backend internal URLs', () => {
    const content = {
      preview_image_link: testImageInFieldPreviewImageLinkWithInternalURLs,
    };
    config.settings.contentMetadataTagsImageField = 'preview_image_link';
    config.settings.internalApiPath = 'http://backend:8080/Plone';

    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ContentMetadataTags content={content} />
      </Provider>,
    );
    const head = Helmet.peek();
    const twitterCard = find(head.metaTags, { name: 'twitter:card' });
    const ogImage = find(head.metaTags, { property: 'og:image' });
    const ogImageHeight = find(head.metaTags, { property: 'og:image:height' });
    const ogImageWidth = find(head.metaTags, { property: 'og:image:width' });

    // Add your assertions here to verify that the metadata tags are rendered correctly
    // For example:
    expect(ogImageHeight.content).toBe('569');
    expect(ogImageWidth.content).toBe('800');
    expect(twitterCard.content).toBe('summary_large_image');
    expect(ogImage.content).toBe(
      'http://localhost:3000/de/@@images/imageInFieldPreviewImageLinkInternalURLs',
    );
  });
});
