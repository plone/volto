/* eslint-disable no-alert */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Keyboard, Text, type Selection } from 'react-aria-components';
import { Button } from '../Button/Button.quanta';
import {
  BackgroundIcon,
  BlindIcon,
  DashIcon,
  LinkIcon,
  MoreoptionsIcon,
  PropertiesIcon,
  SettingsIcon,
} from '../icons';
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSectionHeader,
  MenuSeparator,
  MenuTrigger,
  SubmenuTrigger,
} from './Menu.quanta';

const meta: Meta<typeof Menu> = {
  title: 'Quanta/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function TriggerButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="neutral" accent aria-label="Open menu">
      {children}
    </Button>
  );
}

export const Default: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <Button variant="neutral" accent>
        Edit
      </Button>
      <Menu {...args}>
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const WithTextSlots: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <Button variant="neutral" accent>
        Edit
      </Button>
      <Menu {...args}>
        <MenuItem id="cut">
          <SettingsIcon />
          <Text slot="label">Cut</Text>
          <Text slot="description">Cut to the clipboard</Text>
          <Keyboard>⌘X</Keyboard>
        </MenuItem>
        <MenuItem id="copy">
          <SettingsIcon />
          <Text slot="label">Copy</Text>
          <Text slot="description">Copy to the clipboard</Text>
          <Keyboard>⌘C</Keyboard>
        </MenuItem>
        <MenuItem id="paste">
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
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};

export const DisabledItems: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <BlindIcon />
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

export const WithSeparators: Story = {
  render: (args: any) => (
    <MenuTrigger>
      <TriggerButton>
        <DashIcon />
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
        <BackgroundIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuSection>
          <MenuSectionHeader>Styles</MenuSectionHeader>
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
        </MenuSection>
        <MenuSection>
          <MenuSectionHeader>Align</MenuSectionHeader>
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
        <BackgroundIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuSection>
          <MenuSectionHeader>Styles</MenuSectionHeader>
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
        <LinkIcon />
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
          <TriggerButton>
            <PropertiesIcon />
          </TriggerButton>
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
          <TriggerButton>
            <PropertiesIcon />
          </TriggerButton>
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
          <MoreoptionsIcon />
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
        <MoreoptionsIcon />
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
        <MoreoptionsIcon />
      </TriggerButton>
      <Menu {...args}>
        <MenuItem id="new">New</MenuItem>
        <SubmenuTrigger>
          <MenuItem id="share">Share</MenuItem>
          <Menu>
            <MenuItem id="sms">SMS</MenuItem>
            <MenuItem id="x">X</MenuItem>
            <SubmenuTrigger>
              <MenuItem id="email">Email</MenuItem>
              <Menu>
                <MenuItem id="work">Work</MenuItem>
                <MenuItem id="personal">Personal</MenuItem>
              </Menu>
            </SubmenuTrigger>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  ),
  args: {},
};
