import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import type { ImageProps } from './Image';

const meta: Meta = {
  title: 'Layout/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    loading: {
      control: 'radio',
      options: ['eager', 'lazy'],
      description: 'Loading strategy for the image',
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the image should be responsive',
    },
    imageField: {
      control: 'text',
      description: 'Field name for the image in the item object',
    },
    src: {
      control: 'text',
      description: 'Direct image source URL',
    },
    sizes: {
      control: 'text',
      description: 'Sizes attribute for responsive images',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic image with src prop
export const BasicImage: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'A sample image',
    loading: 'eager',
  },
};

// Lazy loaded image
export const LazyImage: Story = {
  args: {
    src: 'https://picsum.photos/600/400',
    alt: 'A lazy loaded image',
    loading: 'lazy',
  },
};

// Responsive image
export const ResponsiveImage: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'A responsive image',
    responsive: true,
    sizes: '(max-width: 768px) 100vw, 50vw',
  },
};

// Mock item data for Plone content
const mockPloneItem = {
  '@id': 'https://picsum.photos',
  image_field: 'image', // The default image field in Plone content types
  image_scales: {
    image: [
      {
        // This is the primary "download" URL for the image, often a larger scale
        download: 'https://picsum.photos/128/85', // Main image: 600x400 pixels
        width: 600,
        height: 400,
        'content-type': 'image/jpeg',
        scales: {
          // Nested scales, like a thumbnail

          // You can add more scales here, e.g., 'preview', 'mini'
          preview: {
            download: '400/300', // Preview: 400x300 pixels
            width: 400,
            height: 300,
          },
          thumb: {
            download: '128/85', // Thumbnail: 128x85 pixels
            width: 128,
            height: 85,
          },
        },
      },
    ],
  },
  // Add other properties a real Plone item might have
  title: 'Plone Image from Picsum',
  description:
    'An example image for Storybook using Lorem Picsum placeholders.',
};
// Image with Plone item
export const PloneImage: Story = {
  args: {
    item: mockPloneItem,
    alt: 'Image from Plone content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image component using a Plone content item with image scales.',
      },
    },
  },
};

// Image with custom image field
export const CustomImageField: Story = {
  args: {
    item: {
      '@id': 'https://picsum.photos',
      image_field: 'image', // The default image field in Plone content types
      image_scales: {
        hero: [
          {
            // This is the primary "download" URL for the image, often a larger scale
            download: 'https://picsum.photos/128/85', // Main image: 600x400 pixels
            width: 600,
            height: 400,
            'content-type': 'image/jpeg',
            scales: {
              // Nested scales, like a thumbnail

              // You can add more scales here, e.g., 'preview', 'mini'
              hero: {
                download: '400/300', // Preview: 400x300 pixels
                width: 400,
                height: 300,
              },
              thumb: {
                download: '128/85', // Thumbnail: 128x85 pixels
                width: 128,
                height: 85,
              },
            },
          },
        ],
      },
      // Add other properties a real Plone item might have
      title: 'Plone Image from Picsum',
      description:
        'An example image for Storybook using Lorem Picsum placeholders.',
    },
    imageField: 'hero',
    alt: 'Image from Plone content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image component using a Plone content item with image scales.',
      },
    },
  },
};

// Image with image_scales (brain format)
export const BrainImage: Story = {
  args: {
    item: {
      '@id': 'https://picsum.photos',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: '300/200',
            width: 600,
            height: 400,
            'content-type': 'image/jpeg',
            scales: {
              thumb: {
                download: '300/200',
                width: 128,
                height: 85,
              },
            },
          },
        ],
      },
    },
    alt: 'Image from brain with scales',
  },
};

// SVG image
export const SvgImage: Story = {
  args: {
    alt: 'SVG icon',
    src: 'https://github.com/plone/volto/raw/main/logos/volto-colorful.svg',
  },
};

// Image with fallback src
export const ImageWithFallback: Story = {
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Fallback image when item has no image',
  },
};

// Image with custom styling
export const StyledImage: Story = {
  args: {
    src: 'https://picsum.photos/500/300',
    alt: 'Styled image',
    className: 'custom-image-class',
    style: {
      border: '2px solid #007eb6',
      borderRadius: '8px',
    },
  },
};

// No image (returns null)
export const NoImage: Story = {
  args: {
    alt: 'This should not render',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When neither item nor src is provided, the component returns null.',
      },
    },
  },
};
