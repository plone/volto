import LanguageSelector from './LanguageSwitcher';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <LanguageSelector {...args} />,
  args: {
    content: {
      '@components': {
        site: {
          features: {
            multilingual: true,
          },
          'plone.available_languages': ['en', 'es', 'fr'],
          'plone.default_language': 'en',
        },
      },
    },
  },
};
