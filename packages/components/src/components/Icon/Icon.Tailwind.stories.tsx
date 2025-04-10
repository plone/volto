import React from 'react';
import { Icon } from './Icon';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Tailwind/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Xs: Story = {
  args: {
    className: 'text-quanta-sapphire icon-xs',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};

export const Sm: Story = {
  args: {
    className: 'text-quanta-sapphire icon-sm',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};

export const Base: Story = {
  args: {
    className: 'text-quanta-sapphire icon-base',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};

export const IconXL: Story = {
  args: {
    className: 'text-quanta-celery icon-xl',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};

export const Icon2XL: Story = {
  args: {
    className: 'text-quanta-candy icon-2xl',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};

export const Icon3XL: Story = {
  args: {
    className: 'icon-3xl',
    color: '--color-quanta-sapphire',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};
