import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import React from 'react';

const meta: Meta = {
  title: 'Tailwind/Layout/Image',
  component: Image,
  parameters: {
    layout: 'padded',
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
    className: {
      control: 'text',
      description: 'Tailwind CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic rounded image
export const RoundedImage: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Rounded image',
    className: 'rounded-lg shadow-md',
  },
};

// Circular avatar
export const CircularAvatar: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'User avatar',
    className: 'w-20 h-20 rounded-full object-cover border-2 border-gray-300',
  },
};

// Full width responsive hero
export const HeroImage: Story = {
  args: {
    src: 'https://picsum.photos/1200/400',
    alt: 'Hero banner',
    responsive: true,
    className: 'w-full h-64 md:h-96 object-cover',
    sizes: '100vw',
  },
};

// Card image with hover effects
export const CardImage: Story = {
  args: {
    src: 'https://picsum.photos/300/200',
    alt: 'Card image',
    className:
      'w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <Story />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">Card Title</h3>
          <p className="mt-2 text-gray-600">
            This is a sample card with an image.
          </p>
        </div>
      </div>
    ),
  ],
};

// Thumbnail grid
export const ThumbnailGrid: Story = {
  args: {
    src: 'https://picsum.photos/150/150',
    alt: 'Thumbnail',
    className:
      'w-24 h-24 object-cover rounded border hover:border-blue-500 cursor-pointer',
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-4 gap-4">
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
};

// Lazy loaded image with skeleton
export const LazyWithSkeleton: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Lazy loaded image',
    loading: 'lazy',
    className: 'w-full h-64 object-cover rounded-lg animate-pulse bg-gray-200',
  },
};

// Image with overlay text
export const ImageWithOverlay: Story = {
  args: {
    src: 'https://picsum.photos/600/400',
    alt: 'Image with overlay',
    className: 'w-full h-80 object-cover',
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
        <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
          <h2 className="text-2xl font-bold text-white">Overlay Text</h2>
        </div>
      </div>
    ),
  ],
};

// Responsive image sizes
export const ResponsiveSizes: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Responsive image',
    responsive: true,
    className:
      'w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg',
    sizes:
      '(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, (max-width: 1280px) 512px, 576px',
  },
};

// Image with aspect ratio
export const AspectRatioImage: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Aspect ratio image',
    className: 'w-full h-full object-cover',
  },
  decorators: [
    (Story) => (
      <div className="aspect-video w-96 overflow-hidden rounded-lg shadow-md">
        <Story />
      </div>
    ),
  ],
};

// Gallery image with zoom effect
export const GalleryImage: Story = {
  args: {
    src: 'https://picsum.photos/400/400',
    alt: 'Gallery image',
    className:
      'w-full h-full object-cover transition-all duration-500 hover:scale-110',
  },
  decorators: [
    (Story) => (
      <div className="h-64 w-64 cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
};

// Profile image with status indicator
export const ProfileWithStatus: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    alt: 'User profile',
    className:
      'w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg',
  },
  decorators: [
    (Story) => (
      <div className="relative inline-block">
        <Story />
        <div className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
      </div>
    ),
  ],
};

// Mock Plone item with Tailwind styling
const mockPloneItem = {
  '@id': 'https://picsum.photos',
  image_field: 'image', // The default image field in Plone content types
  image_scales: {
    image: [
      {
        // This is the primary "download" URL for the image, often a larger scale
        download: 'https://picsum.photos/600/400', // Main image: 600x400 pixels
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

// Plone image with Tailwind styling
export const PloneImageStyled: Story = {
  args: {
    item: mockPloneItem,
    alt: 'Styled Plone image',
    responsive: true,
    className:
      'w-full max-w-2xl h-auto rounded-xl shadow-2xl border border-gray-200',
    sizes: '(max-width: 768px) 100vw, 672px',
  },
};

// Dark mode image
export const DarkModeImage: Story = {
  args: {
    src: 'https://picsum.photos/1200/800',
    alt: 'Dark mode image',
    className:
      'w-full h-64 object-cover rounded-lg border border-gray-700 shadow-lg',
  },
  decorators: [
    (Story) => (
      <div className="dark rounded-lg bg-gray-900 p-8">
        <Story />
        <p className="mt-4 text-white">Image in dark mode context</p>
      </div>
    ),
  ],
};
