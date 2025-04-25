import React from 'react';
import { Toolbar } from './Toolbar';
import {
  Button,
  Checkbox,
  Group,
  Separator,
  ToggleButton,
} from 'react-aria-components';
import { Menu, MenuItem } from '../Menu/Menu';

import { BoldIcon } from '../Icons/BoldIcon';
import { ItalicIcon } from '../Icons/ItalicIcon';
import { LinkIcon } from '../Icons/LinkIcon';

import type { Meta } from '@storybook/react';

import '../../styles/basic/Toolbar.css';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = (args: any) => (
  <Toolbar aria-label="Text formatting" {...args}>
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
    <Group aria-label="Clipboard">
      <Button>Copy</Button>
      <Button>Paste</Button>
      <Button>Cut</Button>
    </Group>
    <Separator orientation="vertical" />
    <Checkbox>
      <div className="checkbox">
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <polyline points="1 9 7 14 15 4" />
        </svg>
      </div>
      Night Mode
    </Checkbox>
    <Separator orientation="vertical" />
    <Menu button="Edit">
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  </Toolbar>
);
