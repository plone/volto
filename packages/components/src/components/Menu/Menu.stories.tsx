/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header, Keyboard, Text, type Selection } from 'react-aria-components';
import { Button } from '../Button/Button';
import { SettingsIcon } from '../icons/SettingsIcon';
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  SubmenuTrigger,
} from './Menu';

const meta = {
  title: 'Basic/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

function TriggerButton({ children }: { children: React.ReactNode }) {
  return <Button>{children}</Button>;
}

export const Default: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>Edit</TriggerButton>
      <Menu {...args}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const WithTextSlots: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>Edit</TriggerButton>
      <Menu {...args}>
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
    </MenuTrigger>
  ),
  args: {},
};

export const WithIconButton: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const DisabledItems: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args} disabledKeys={['paste']}>
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const AsADynamicCollection: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>Actions</TriggerButton>
      <Menu {...args} onAction={alert}>
        {(item: { id: number; name: string }) => (
          <MenuItem>{item.name}</MenuItem>
        )}
      </Menu>
    </MenuTrigger>
  ),
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
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
        <MenuSeparator />
        <MenuItem id="bold">Bold</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const WithSections: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuSection>
          <Header>Styles</Header>
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
        <MenuSection>
          <Header>Align</Header>
          <MenuItem id="left">Left</MenuItem>
          <MenuItem id="middle">Middle</MenuItem>
          <MenuItem id="right">Right</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const WithCustomHeader: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuSection>
          <Header>Styles</Header>
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const AsLinks: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
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
    </MenuTrigger>
  ),
  args: {},
};

export const SingleSelection: Story = {
  render: (args: any) => {
    const [selected, setSelected] = React.useState<Selection>(
      new Set(['center']),
    );

    return (
      <>
        <MenuTrigger>
          <TriggerButton>Align</TriggerButton>
          <Menu
            {...args}
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <MenuItem id="left">Left</MenuItem>
            <MenuItem id="center">Center</MenuItem>
            <MenuItem id="right">Right</MenuItem>
          </Menu>
        </MenuTrigger>
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
        <MenuTrigger>
          <TriggerButton>View</TriggerButton>
          <Menu
            {...args}
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <MenuItem id="sidebar">Sidebar</MenuItem>
            <MenuItem id="searchbar">Searchbar</MenuItem>
            <MenuItem id="tools">Tools</MenuItem>
            <MenuItem id="console">Console</MenuItem>
          </Menu>
        </MenuTrigger>
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
      <MenuTrigger {...args} isOpen={open} onOpenChange={setOpen}>
        <TriggerButton>
          <SettingsIcon />
        </TriggerButton>
        <Menu>
          <MenuItem id="cut">Cut</MenuItem>
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="paste">Paste</MenuItem>
        </Menu>
      </MenuTrigger>
    );
  },
  args: {},
};

export const LongPress: Story = {
  render: (args: any) => (
    <MenuTrigger trigger="longPress">
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args} onAction={(id) => alert(String(id))}>
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const WithSubmenu: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <SettingsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuItem id="new">New</MenuItem>
        <SubmenuTrigger>
          <MenuItem id="share">Share</MenuItem>
          <Menu>
            <MenuItem id="sms">SMS</MenuItem>
            <MenuItem id="email">Email</MenuItem>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};
