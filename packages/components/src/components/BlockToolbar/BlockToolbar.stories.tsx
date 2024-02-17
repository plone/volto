import React from 'react';
import { BlockToolbar } from './BlockToolbar';
import {
  Button,
  Checkbox,
  Group,
  Separator,
  Text,
  ToggleButton,
} from 'react-aria-components';
import { Menu, MenuItem } from '../Menu/Menu';

import { BoldIcon } from '../Icons/BoldIcon';
import { ItalicIcon } from '../Icons/ItalicIcon';
import { LinkIcon } from '../Icons/LinkIcon';

import type { Meta } from '@storybook/react';
import { SettingsIcon } from '../Icons/SettingsIcon';
import { RowbeforeIcon } from '../Icons/RowbeforeIcon';
import { RowafterIcon } from '../Icons/RowafterIcon';
import { MoreoptionsIcon } from '../Icons/MoreoptionsIcon';
import { BinIcon } from '../Icons/BinIcon';

import '../../styles/basic/BlockToolbar.css';

const meta: Meta<typeof BlockToolbar> = {
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
