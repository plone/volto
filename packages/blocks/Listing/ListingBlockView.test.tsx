import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ListingBlockView from './ListingBlockView';
import { expect, it } from 'vitest';
import type { BlocksFormData, BlockViewProps } from '@plone/types';

expect.extend(toHaveNoViolations);

it('ListingBlockView basic test', async () => {
  const props = {
    data: {
      '@type': 'listing',
      headline: 'My listing',
      headlineTag: 'h2',
      querystring: {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Image', 'News Item'],
          },
        ],
        sort_order: 'ascending',
      },
      variation: 'summary',
      items: [
        {
          '@id': '/test-page/news1',
          '@type': 'News Item',
          description: '',
          effective: '2025-11-23T13:34:29+00:00',
          end: null,
          getObjSize: '0 KB',
          head_title: null,
          image_field: 'preview_image_link',
          image_scales: {
            preview_image_link: [
              {
                base_path: '/test-page/imposter-syndrom.jpg',
                'content-type': 'image/jpeg',
                download:
                  '@@images/image-1080-73b1b51982a9f054ac17e7960e741339.jpeg',
                filename: 'imposter syndrom.jpg',
                height: 1080,
                scales: {
                  icon: {
                    download:
                      '@@images/image-32-82c1017c9480f006e25ec571d24d65e8.jpeg',
                    height: 32,
                    width: 32,
                  },
                  large: {
                    download:
                      '@@images/image-800-13b106d5366c2f286c5ac556b3c36cff.jpeg',
                    height: 800,
                    width: 800,
                  },
                  larger: {
                    download:
                      '@@images/image-1000-3dd40288939d0094712e59b8dbf407d9.jpeg',
                    height: 1000,
                    width: 1000,
                  },
                  mini: {
                    download:
                      '@@images/image-200-0ae02f2c3b62269b53daa0ff46b61de9.jpeg',
                    height: 200,
                    width: 200,
                  },
                  preview: {
                    download:
                      '@@images/image-400-2d9077b068ee6dc4c683dd02be97def5.jpeg',
                    height: 400,
                    width: 400,
                  },
                  teaser: {
                    download:
                      '@@images/image-600-fbd0b8610449ee21d7936c9e48b6251b.jpeg',
                    height: 600,
                    width: 600,
                  },
                  thumb: {
                    download:
                      '@@images/image-128-2324200983e9024868b85fd947b1cf3d.jpeg',
                    height: 128,
                    width: 128,
                  },
                  tile: {
                    download:
                      '@@images/image-64-a563440feec7f6c6a607bee693806fa9.jpeg',
                    height: 64,
                    width: 64,
                  },
                },
                size: 644480,
                width: 1080,
              },
            ],
          },
          mime_type: 'text/plain',
          nav_title: null,
          review_state: 'published',
          start: null,
          title: 'news1',
          type_title: 'News Item',
        },
        {
          '@id': '/test-page/jinx-arcane.jpg',
          '@type': 'Image',
          description: 'Some description',
          effective: '1969-12-31T00:00:00+00:00',
          end: null,
          getObjSize: '237.0 KB',
          head_title: null,
          image_field: 'image',
          image_scales: {
            image: [
              {
                'content-type': 'image/jpeg',
                download:
                  '@@images/image-1920-fed62a8eae1cc98aa8696d97de127345.jpeg',
                filename: 'jinx-arcane.jpg',
                height: 1080,
                scales: {
                  great: {
                    download:
                      '@@images/image-1200-d0ef23118d4d46b7aafc874697e3acca.jpeg',
                    height: 675,
                    width: 1200,
                  },
                  huge: {
                    download:
                      '@@images/image-1600-e1dd90025dd334a4396425521dc75dfa.jpeg',
                    height: 900,
                    width: 1600,
                  },
                  icon: {
                    download:
                      '@@images/image-32-4ab8f39328035a1062f40f892d257f10.jpeg',
                    height: 18,
                    width: 32,
                  },
                  large: {
                    download:
                      '@@images/image-800-21d13a0961a82b0117a0e63a5fdff557.jpeg',
                    height: 450,
                    width: 800,
                  },
                  larger: {
                    download:
                      '@@images/image-1000-b33ffc1531baf0aec0a1a711b7cebd64.jpeg',
                    height: 562,
                    width: 1000,
                  },
                  mini: {
                    download:
                      '@@images/image-200-d16982fd62fa91396c62df3508bbdb0f.jpeg',
                    height: 112,
                    width: 200,
                  },
                  preview: {
                    download:
                      '@@images/image-400-1dfe95227b2c887bc421e45983f02134.jpeg',
                    height: 225,
                    width: 400,
                  },
                  teaser: {
                    download:
                      '@@images/image-600-52c8fa2b59a78452d1493e981d25ce89.jpeg',
                    height: 337,
                    width: 600,
                  },
                  thumb: {
                    download:
                      '@@images/image-128-b7c6bc2531c72be668b6f6fbfdd85f4b.jpeg',
                    height: 72,
                    width: 128,
                  },
                  tile: {
                    download:
                      '@@images/image-64-23bc7be26f44dd7c4767c94007c1a46a.jpeg',
                    height: 36,
                    width: 64,
                  },
                },
                size: 242687,
                width: 1920,
              },
            ],
          },
          mime_type: 'image/jpeg',
          nav_title: null,
          review_state: null,
          start: null,
          title: 'Jinx',
          type_title: 'Image',
        },
        {
          '@id': '/test-page/imposter-syndrom.jpg',
          '@type': 'Image',
          description: '',
          effective: '1969-12-31T00:00:00+00:00',
          end: null,
          getObjSize: '629.4 KB',
          head_title: null,
          image_field: 'image',
          image_scales: {
            image: [
              {
                'content-type': 'image/jpeg',
                download:
                  '@@images/image-1080-73b1b51982a9f054ac17e7960e741339.jpeg',
                filename: 'imposter syndrom.jpg',
                height: 1080,
                scales: {
                  icon: {
                    download:
                      '@@images/image-32-82c1017c9480f006e25ec571d24d65e8.jpeg',
                    height: 32,
                    width: 32,
                  },
                  large: {
                    download:
                      '@@images/image-800-13b106d5366c2f286c5ac556b3c36cff.jpeg',
                    height: 800,
                    width: 800,
                  },
                  larger: {
                    download:
                      '@@images/image-1000-3dd40288939d0094712e59b8dbf407d9.jpeg',
                    height: 1000,
                    width: 1000,
                  },
                  mini: {
                    download:
                      '@@images/image-200-0ae02f2c3b62269b53daa0ff46b61de9.jpeg',
                    height: 200,
                    width: 200,
                  },
                  preview: {
                    download:
                      '@@images/image-400-2d9077b068ee6dc4c683dd02be97def5.jpeg',
                    height: 400,
                    width: 400,
                  },
                  teaser: {
                    download:
                      '@@images/image-600-fbd0b8610449ee21d7936c9e48b6251b.jpeg',
                    height: 600,
                    width: 600,
                  },
                  thumb: {
                    download:
                      '@@images/image-128-2324200983e9024868b85fd947b1cf3d.jpeg',
                    height: 128,
                    width: 128,
                  },
                  tile: {
                    download:
                      '@@images/image-64-a563440feec7f6c6a607bee693806fa9.jpeg',
                    height: 64,
                    width: 64,
                  },
                },
                size: 644480,
                width: 1080,
              },
            ],
          },
          mime_type: 'image/jpeg',
          nav_title: null,
          review_state: null,
          start: null,
          title: 'imposter syndrom.jpg',
          type_title: 'Image',
        },
      ],
    } as BlocksFormData,
  } as BlockViewProps;
  const { container } = render(<ListingBlockView {...props} />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
  const link = screen.getAllByRole('link')[0];
  expect(link.getAttribute('href')).toBe('/test-page/news1');
});
