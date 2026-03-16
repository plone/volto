/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BackgroundIcon,
  BlindIcon,
  DashIcon,
  LinkIcon,
  PropertiesIcon,
  SettingsIcon,
} from '../../components/icons';
import { type Selection } from 'react-aria-components';
import { Menu } from './Menu.quanta';

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
      button={<BlindIcon />}
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
      button={<DashIcon />}
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
      button={<BackgroundIcon />}
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
      button={<LinkIcon />}
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
    ></Menu>
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
        <Menu
          {...args}
          button={<PropertiesIcon />}
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          menuItems={[
            { id: 'left', label: 'Left' },
            { id: 'center', label: 'Center' },
            { id: 'right', label: 'Right' },
          ]}
        ></Menu>
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
          button={<PropertiesIcon />}
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          menuItems={[
            { id: 'sidebar', label: 'Sidebar' },
            { id: 'searchbar', label: 'Searchbar' },
            { id: 'tools', label: 'Tools' },
            { id: 'console', label: 'Console' },
          ]}
        ></Menu>
        <p>
          Current selection (controlled):{' '}
          {selected === 'all' ? 'all' : [...selected].join(', ')}
        </p>
      </>
    );
  },
  args: {},
};

export const LongPress: Story = {
  render: (args: any) => (
    <Menu
      {...args}
      button="Long press"
      menuItems={[
        { id: 'cut', label: 'Cut' },
        { id: 'copy', label: 'Copy' },
        { id: 'paste', label: 'Paste' },
      ]}
    ></Menu>
  ),
  args: {
    trigger: 'longPress',
    onPress: () => alert('crop'),
    onAction: (id: any) => alert(id),
  },
};
