import Table from './Table';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { name: 'Name', id: 'name', isRowHeader: true },
      { name: 'Type', id: 'type' },
      { name: 'Date Modified', id: 'date' },
    ],
    rows: [
      { id: '1', name: 'Games', date: '6/7/2020', type: 'File folder' },
      { id: '2', name: 'Program Files', date: '4/7/2021', type: 'File folder' },
      { id: '3', name: 'bootmgr', date: '11/20/2010', type: 'System file' },
      { id: '4', name: 'log.txt', date: '1/18/2016', type: 'Text Document' },
    ],
  },
};
