import type { Meta, StoryObj } from '@storybook/react';
import { MoreoptionsIcon, SettingsIcon } from '../../components/icons';

import React from 'react';
import {
  MenuTrigger,
  SubmenuTrigger,
  Keyboard,
  Text,
  Separator,
  MenuItem,
  MenuSection,
} from 'react-aria-components';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button="Edit"
      menuItems={[
        { id: 'cut', label: 'Cut' },
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste' },
      ]}
    ></Menu>
  ),
  args: {},
};

export const WithTextSlots: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button="Edit"
      menuItems={[
        {
          id: 'cut',
          label: 'Cut',
          icon: SettingsIcon,
          description: 'Cut to the clipboard',
          keyboard: '⌘X',
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: SettingsIcon,
          description: 'Copy to the clipboard',
          keyboard: '⌘C',
        },
        {
          id: 'paste',
          label: 'Paste',
          icon: SettingsIcon,
          description: 'Paste from the clipboard',
          keyboard: '⌘V',
        },
      ]}
    ></Menu>
  ),
  args: {},
};

export const WithIconButton: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button={<SettingsIcon />}
      menuItems={[
        { id: 'cut', label: 'Cut' },
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste' },
      ]}
    ></Menu>
  ),
  args: {},
};

export const DisabledItems: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button={<SettingsIcon />}
      disabledKeys={['paste']}
      menuItems={[
        { id: 'cut', label: 'Cut' },
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste', disabled: true },
      ]}
    ></Menu>
  ),
  args: {},
};

export const WithSeparators: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button={<SettingsIcon />}
      menuItems={[
        { id: 'cut', label: 'Cut' },
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste' },
        { separator: true },
        { id: 'bold', label: 'Bold' },
      ]}
    ></Menu>
  ),
  args: {},
};

export const WithSections: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button={<SettingsIcon />}
      menuItems={[
        {
          section: true,
          header: 'Styles',
          children: [
            { id: 'bold', label: 'Bold' },
            { id: 'underline', label: 'Underline' },
          ],
        },
        {
          section: true,
          header: 'Align',
          children: [
            { id: 'left', label: 'Left' },
            { id: 'middle', label: 'Middle' },
            { id: 'right', label: 'Right' },
          ],
        },
      ]}
    ></Menu>
  ),
  args: {},
};

export const AsLinks: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button={<SettingsIcon />}
      menuItems={[
        {
          id: 'adobe',
          label: 'Adobe',
          href: 'https://adobe.com/',
          target: '_blank',
        },
        {
          id: 'apple',
          label: 'Apple',
          href: 'https://apple.com/',
          target: '_blank',
        },
        {
          id: 'google',
          label: 'Google',
          href: 'https://google.com/',
          target: '_blank',
        },
        {
          id: 'microsoft',
          label: 'Microsoft',
          href: 'https://microsoft.com/',
          target: '_blank',
        },
      ]}
    >
      <MenuItem href="https://adobe.com/" target="_blank">
        Adobe
      </MenuItem>
      <MenuItem href="https://apple.com/" target="_blank">
        Apple
      </MenuItem>
      <MenuItem href="https://google.com/" target="_blank">
        Google
      </MenuItem>
      <MenuItem href="https://microsoft.com/" target="_blank">
        Microsoft
      </MenuItem>
    </Menu>
  ),
  args: {},
};
