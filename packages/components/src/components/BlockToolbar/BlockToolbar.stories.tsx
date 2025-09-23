import React from 'react';
import { BlockToolbar } from './BlockToolbar';
import { Group, Separator, Text, ToggleButton } from 'react-aria-components';
import { Menu, MenuItem } from '../Menu/Menu';

import { BoldIcon } from '../icons/BoldIcon';
import { ItalicIcon } from '../icons/ItalicIcon';
import { LinkIcon } from '../icons/LinkIcon';

import type { Meta } from '@storybook/react-vite';
import { SettingsIcon } from '../icons/SettingsIcon';
import { RowbeforeIcon } from '../icons/RowbeforeIcon';
import { RowafterIcon } from '../icons/RowafterIcon';
import { MoreoptionsIcon } from '../icons/MoreoptionsIcon';
import { BinIcon } from '../icons/BinIcon';

const meta: Meta<typeof BlockToolbar> = {
  title: 'Basic/BlockToolbar',
  component: BlockToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = (args: any) => (
  <BlockToolbar aria-label="Text formatting" {...args}>
    <Group aria-label="Style">
      <ToggleButton aria-label="Bold">
        <BoldIcon />
      </ToggleButton>
      <ToggleButton aria-label="Italic">
        <ItalicIcon />
      </ToggleButton>
      <ToggleButton aria-label="Underline">
        <LinkIcon />
      </ToggleButton>
    </Group>
    <Separator orientation="vertical" />
    <Menu button={<MoreoptionsIcon />}>
      <MenuItem>
        <SettingsIcon />
        <Text slot="label">Settings</Text>
      </MenuItem>
      <MenuItem>
        <RowbeforeIcon />
        <Text slot="label">Insert block before</Text>
      </MenuItem>
      <MenuItem>
        <RowafterIcon />
        <Text slot="label">Insert block after</Text>
      </MenuItem>
      <Separator />
      <MenuItem>
        <BinIcon />
        <Text slot="label">Remove block</Text>
      </MenuItem>
    </Menu>
  </BlockToolbar>
);
