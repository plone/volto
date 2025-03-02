/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Menu, MenuItem } from './Menu';
import {
  Header,
  Keyboard,
  Section,
  type Selection,
  Separator,
  Text,
} from 'react-aria-components';
import { SettingsIcon } from '../icons/SettingsIcon';
import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Menu.css';

const meta = {
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Menu {...args} button="Edit">
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  ),
  args: {},
};

export const WithTextSlots: Story = {
  render: (args: any) => (
    <Menu {...args} button="Edit">
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

export const WithIconButton: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />}>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  ),
  args: {},
};

export const DisabledItems: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />} disabledKeys={['paste']}>
      <MenuItem id="cut">Cut</MenuItem>
      <MenuItem id="copy">Copy</MenuItem>
      <MenuItem id="paste">Paste</MenuItem>
    </Menu>
  ),
  args: {},
};

export const AsADynamicCollection: Story = {
  render: (args: any) => {
    return (
      <Menu {...args} button="Actions" onAction={alert}>
        {(item: { id: number; name: string }) => (
          <MenuItem>{item.name}</MenuItem>
        )}
      </Menu>
    );
  },
  args: {
    items: [
      { id: 1, name: 'New' },
      { id: 2, name: 'Open' },
      { id: 3, name: 'Close' },
      { id: 4, name: 'Save' },
      { id: 5, name: 'Duplicate' },
      { id: 6, name: 'Rename' },
      { id: 7, name: 'Move' },
    ],
  },
};

export const WithSeparators: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />}>
      <MenuItem id="cut">Cut</MenuItem>
      <MenuItem id="copy">Copy</MenuItem>
      <MenuItem id="paste">Paste</MenuItem>
      <Separator />
      <MenuItem id="bold">Bold</MenuItem>
    </Menu>
  ),
  args: {},
};

export const WithSections: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />}>
      <Section>
        <Header>Styles</Header>
        <MenuItem id="bold">Bold</MenuItem>
        <MenuItem id="underline">Underline</MenuItem>
      </Section>
      <Section>
        <Header>Align</Header>
        <MenuItem id="left">Left</MenuItem>
        <MenuItem id="middle">Middle</MenuItem>
        <MenuItem id="right">Right</MenuItem>
      </Section>
    </Menu>
  ),
  args: {},
};

export const AsLinks: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />}>
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

// export const OpenByDefault: Story = {
//   render: (args: any) => (
//     <Menu button={<SettingsIcon />} isOpen>
//       <MenuItem id="cut">Cut</MenuItem>
//       <MenuItem id="copy">Copy</MenuItem>
//       <MenuItem id="paste">Paste</MenuItem>
//     </Menu>
//   ),
//   args: {},
// };

export const SingleSelection: Story = {
  render: (args: any) => {
    const [selected, setSelected] = React.useState<Selection>(
      new Set(['center']),
    );

    return (
      <>
        <Menu
          {...args}
          button="Align"
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="left">Left</MenuItem>
          <MenuItem id="center">Center</MenuItem>
          <MenuItem id="right">Right</MenuItem>
        </Menu>
        <p>
          Current selection (controlled):{' '}
          {selected === 'all' ? 'all' : [...selected].join(', ')}
        </p>
      </>
    );
  },
  args: {},
};

export const MultipleSelection: Story = {
  render: (args: any) => {
    const [selected, setSelected] = React.useState<Selection>(
      new Set(['sidebar', 'console']),
    );

    return (
      <>
        <Menu
          {...args}
          button="View"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <MenuItem id="sidebar">Sidebar</MenuItem>
          <MenuItem id="searchbar">Searchbar</MenuItem>
          <MenuItem id="tools">Tools</MenuItem>
          <MenuItem id="console">Console</MenuItem>
        </Menu>
        <p>
          Current selection (controlled):{' '}
          {selected === 'all' ? 'all' : [...selected].join(', ')}
        </p>
      </>
    );
  },
  args: {},
};

export const ControlledState: Story = {
  render: (args: any) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Menu
        {...args}
        button={<SettingsIcon />}
        isOpen={open}
        onOpenChange={setOpen}
      >
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    );
  },
  args: {},
};

export const LongPress: Story = {
  render: (args: any) => (
    <Menu {...args} button={<SettingsIcon />}>
      <MenuItem id="cut">Cut</MenuItem>
      <MenuItem id="copy">Copy</MenuItem>
      <MenuItem id="paste">Paste</MenuItem>
    </Menu>
  ),
  args: {
    trigger: 'longPress',
    onPress: () => alert('crop'),
    onAction: (id) => alert(id),
  },
};
