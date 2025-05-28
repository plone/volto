import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import type { ImageProps } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Basic/Image',
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
type Story = StoryObj<typeof meta>;

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
  '@id': '/content/sample-page',
  image_field: 'image',
  image: {
    download: 'image.jpg',
    width: 800,
    height: 600,
    'content-type': 'image/jpeg',
    scales: {
      large: {
        download: 'image-large.jpg',
        width: 768,
        height: 576,
      },
      medium: {
        download: 'image-medium.jpg',
        width: 400,
        height: 300,
      },
      small: {
        download: 'image-small.jpg',
        width: 200,
        height: 150,
      },
    },
  },
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
      '@id': '/content/custom-page',
      hero_image: {
        download: 'hero.jpg',
        width: 1200,
        height: 400,
        'content-type': 'image/jpeg',
      },
    },
    imageField: 'hero_image',
    alt: 'Hero image from custom field',
  },
};

// Image with image_scales (brain format)
export const BrainImage: Story = {
  args: {
    item: {
      '@id': '/content/brain-page',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            download: 'preview.jpg',
            width: 600,
            height: 400,
            'content-type': 'image/jpeg',
            scales: {
              thumb: {
                download: 'preview-thumb.jpg',
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
    item: {
      '@id': '/content/svg-page',
      image: {
        download: 'icon.svg',
        width: 100,
        height: 100,
        'content-type': 'image/svg+xml',
      },
    },
    alt: 'SVG icon',
  },
};

// Image with fallback src
export const ImageWithFallback: Story = {
  args: {
    item: {
      '@id': '/content/broken-page',
      // No image field, should fall back to src
    },
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
        story: 'When neither item nor src is provided, the component returns null.',
      },
    },
  },
};
