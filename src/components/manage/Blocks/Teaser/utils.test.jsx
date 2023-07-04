import { getTeaserImageURL } from './utils';
import config from '@plone/volto/registry';

beforeAll(() => {
  config.blocks.blocksConfig.teaser = {};
  config.blocks.blocksConfig.teaser.imageScale = 'teaser';
});

describe('getTeaserImageURL tests', () => {
  it('getTeaserImageURL internal URL - no overriden', () => {
    const align = 'left';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = undefined;
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/@@images/teaser_scale_URL',
    );
  });

  it('getTeaserImageURL internal URL - no overriden - no scale', () => {
    const align = 'left';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {},
          },
        ],
      },
    };
    const image = undefined;
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/@@images/default_original_URL',
    );
  });

  it('getTeaserImageURL internal URL - no overriden - no catalog image info', () => {
    const align = 'left';
    const href = {
      '@id': '/document',
      image_field: 'image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {},
          },
        ],
      },
    };
    const image = undefined;
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/@@images/image/teaser',
    );
  });

  it('getTeaserImageURL internal URL - no overriden - center', () => {
    const align = 'center';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              great: {
                download: '@@images/great_scale_URL',
              },
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = undefined;
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/@@images/great_scale_URL',
    );
  });

  it('getTeaserImageURL internal URL - no overriden - center - no great scale', () => {
    const align = 'center';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = undefined;
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/@@images/default_original_URL',
    );
  });

  it('getTeaserImageURL internal URL - image overriden', () => {
    const align = 'left';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = {
      '@id': '/document/image',
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/overriden_image_default_original_URL',
            scales: {
              teaser: {
                download: '@@images/overriden_image_teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/image/@@images/overriden_image_teaser_scale_URL',
    );
  });

  it('getTeaserImageURL internal URL - image overriden - center - no great scale', () => {
    const align = 'center';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = {
      '@id': '/document/image',
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/overriden_image_default_original_URL',
            scales: {
              teaser: {
                download: '@@images/overriden_image_teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    expect(getTeaserImageURL({ href, image, align })).toBe(
      '/document/image/@@images/overriden_image_default_original_URL',
    );
  });

  it('getTeaserImageURL internal URL - image overriden - external', () => {
    const align = 'left';
    const href = {
      '@id': '/document',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '@@images/default_original_URL',
            scales: {
              teaser: {
                download: '@@images/teaser_scale_URL',
              },
            },
          },
        ],
      },
    };
    const image = {
      '@id': 'https://plone.org/document/image.png',
    };

    expect(getTeaserImageURL({ href, image, align })).toBe(
      'https://plone.org/document/image.png',
    );
  });
});
