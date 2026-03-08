import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Group,
  ToggleButton,
  type ToggleButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Toolbar } from './Toolbar.quanta';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox.quanta';
import { Menu } from '../Menu/Menu.quanta';
import { Separator } from '../Separator/Separator.quanta';
import {
  AligncenterIcon,
  AlignleftIcon,
  AlignrightIcon,
  BoldIcon,
  CopyIcon,
  CutIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListnumbersIcon,
  MoreoptionsIcon,
  PasteIcon,
  RedoIcon,
  SearchIcon,
  UndoIcon,
  ChevrondownIcon,
  ChevronupIcon,
  BinIcon,
} from '../icons';

const toggleStyles = tv({
  base: `
    flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-quanta-air
    text-quanta-iron transition
    hover:bg-quanta-snow hover:text-quanta-royal
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-quanta-cobalt
    active:bg-quanta-smoke
  `,
  variants: {
    isSelected: {
      true: `
        bg-quanta-cobalt text-white
        hover:bg-quanta-royal
        active:bg-quanta-sapphire
      `,
    },
    isDisabled: {
      true: `
        cursor-not-allowed opacity-50
        hover:bg-quanta-air hover:text-quanta-iron
      `,
    },
  },
});

function FormattingToggle(props: ToggleButtonProps) {
  return (
    <ToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toggleStyles({ ...renderProps, className }),
      )}
    />
  );
}

const meta: Meta<typeof Toolbar> = {
  title: 'Quanta/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toolbar aria-label="Text formatting" {...args}>
      <Group aria-label="Formatting">
        <FormattingToggle aria-label="Bold">
          <BoldIcon className="h-4 w-4" />
        </FormattingToggle>
        <FormattingToggle aria-label="Italic">
          <ItalicIcon className="h-4 w-4" />
        </FormattingToggle>
        <FormattingToggle aria-label="Link">
          <LinkIcon className="h-4 w-4" />
        </FormattingToggle>
      </Group>
      <Separator orientation="vertical" />
      <Group aria-label="Lists">
        <FormattingToggle aria-label="Bulleted List">
          <ListIcon className="h-4 w-4" />
        </FormattingToggle>
        <FormattingToggle aria-label="Numbered List">
          <ListnumbersIcon className="h-4 w-4" />
        </FormattingToggle>
      </Group>
      <Separator orientation="vertical" />
      <Group aria-label="Clipboard actions">
        <Button variant="neutral">Copy</Button>
        <Button variant="neutral">Paste</Button>
        <Button variant="neutral">Cut</Button>
      </Group>
      <Separator orientation="vertical" />
      <Checkbox value="comments">Allow comments</Checkbox>
      <Separator orientation="vertical" />
      <Menu
        button="More"
        menuItems={[
          { id: 'undo', label: 'Undo', keyboard: '⌘Z' },
          { id: 'redo', label: 'Redo', keyboard: '⇧⌘Z' },
          { separator: true },
          { id: 'settings', label: 'Toolbar settings' },
        ]}
      />
    </Toolbar>
  ),
};

export const WithMenus: Story = {
  render: (args) => (
    <Toolbar aria-label="Clipboard controls" {...args}>
      <Group aria-label="Undo/Redo">
        <Button variant="icon" aria-label="Undo">
          <UndoIcon className="h-5 w-5" />
        </Button>
        <Button variant="icon" aria-label="Redo">
          <RedoIcon className="h-5 w-5" />
        </Button>
      </Group>
      <Separator orientation="vertical" />
      <Menu
        button={<MoreoptionsIcon className="h-4 w-4" />}
        placement="bottom end"
        menuItems={[
          { id: 'cut', label: 'Cut', icon: CutIcon },
          { id: 'copy', label: 'Copy', icon: CopyIcon },
          { id: 'paste', label: 'Paste', icon: PasteIcon },
        ]}
      />
      <Button variant="primary" accent>
        Publish
      </Button>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Toolbar aria-label="Alignment" orientation="vertical" {...args}>
      <Group aria-label="Align text">
        <FormattingToggle aria-label="Align left" defaultSelected>
          <AlignleftIcon className="h-4 w-4" />
        </FormattingToggle>
        <FormattingToggle aria-label="Align center">
          <AligncenterIcon className="h-4 w-4" />
        </FormattingToggle>
        <FormattingToggle aria-label="Align right">
          <AlignrightIcon className="h-4 w-4" />
        </FormattingToggle>
      </Group>
      <Separator />
      <Checkbox value="wrapText" defaultSelected>
        Wrap text
      </Checkbox>
      <Separator />
      <Menu
        button="Spacing"
        menuItems={[
          { id: 'tight', label: 'Tight' },
          { id: 'normal', label: 'Normal' },
          { id: 'loose', label: 'Loose' },
        ]}
      />
    </Toolbar>
  ),
};

export const WrappingContent: Story = {
  render: (args) => {
    const actions = [
      { id: 'undo', label: 'Undo', icon: UndoIcon },
      { id: 'redo', label: 'Redo', icon: RedoIcon },
      { id: 'cut', label: 'Cut', icon: CutIcon },
      { id: 'copy', label: 'Copy', icon: CopyIcon },
      { id: 'paste', label: 'Paste', icon: PasteIcon },
      { id: 'find', label: 'Find', icon: SearchIcon },
      { id: 'link', label: 'Link', icon: LinkIcon },
    ];
    return (
      <Toolbar aria-label="Large toolbar" {...args}>
        {actions.map(({ id, label, icon: Icon }) => (
          <Button key={id} variant="icon" aria-label={label}>
            <Icon className="h-5 w-5" />
          </Button>
        ))}
        <Separator orientation="vertical" />
        <Button variant="primary">Save draft</Button>
        <Button variant="neutral">Preview</Button>
        <Button variant="destructive">Delete</Button>
      </Toolbar>
    );
  },
};

export const BlockActions: Story = {
  render: (args) => (
    <Toolbar aria-label="Block actions" {...args}>
      <Group aria-label="Move up/Move down">
        <Button aria-label="Move up">
          <ChevronupIcon />
        </Button>
        <Button aria-label="Move down">
          <ChevrondownIcon />
        </Button>
        <Button aria-label="Delete block">
          <BinIcon />
        </Button>
      </Group>
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};
