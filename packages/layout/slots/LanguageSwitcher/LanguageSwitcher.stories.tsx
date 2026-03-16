import LanguageSwitcher from './LanguageSwitcher';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Language Switcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <LanguageSwitcher {...args} />,
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
