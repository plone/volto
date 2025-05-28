import type { Meta, StoryObj } from '@storybook/react';
import { MoreoptionsIcon, SettingsIcon } from '../../components/icons';

import React from 'react';
import {
  MenuTrigger,
  SubmenuTrigger,
  Keyboard,
  Text,
  MenuItem,
  MenuSection,
} from 'react-aria-components';
import { Button } from '@plone/components';
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
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste' },
      ]}
    >
      <MenuItem>
        <SettingsIcon />
        <Text slot="label">Cut</Text>
        <Text slot="description">Cut to the clipboard</Text>
        <Keyboard>⌘X</Keyboard>
      </MenuItem>
      <MenuItem>
        <SettingsIcon />
        <Text slot="label">Copy</Text>
        <Text slot="description">Copy to the clipboard</Text>
        <Keyboard>⌘C</Keyboard>
      </MenuItem>
      <MenuItem>
        <SettingsIcon />
        <Text slot="label">Paste</Text>
        <Text slot="description">Paste from the clipboard</Text>
        <Keyboard>⌘V</Keyboard>
      </MenuItem>
    </Menu>
  ),
  args: {},
};
