import { useDragAndDrop } from 'react-aria-components';
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

/**
 * For more fine grained control over the selection mode,
 * see https://react-spectrum.adobe.com/react-aria/Table.html#single-selection
 */
export const SingleSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: 'single',
  },
};

/**
 * For more fine grained control over the selection mode,
 * see https://react-spectrum.adobe.com/react-aria/Table.html#multiple-selection
 */
export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: 'multiple',
  },
};

/**
 * In order to make the rows draggable, you need to pass
 * the `dragAndDropHooks` prop to the Table component.
 * This prop has to be generated using the `useDragAndDrop` hook,
 * passing the `getItems` and `onReorder` functions.
 *
 * See here for more information:
 * https://react-spectrum.adobe.com/react-aria/Table.html#drag-and-drop
 */
export const DraggableRows: Story = {
  decorators: [
    (Story) => {
      const { dragAndDropHooks } = useDragAndDrop({
        getItems: (keys) =>
          [...keys].map((key) => ({
            'text/plain': key.toString(),
          })),
        onReorder(e) {
          if (e.target.dropPosition === 'before') {
            console.log('moveBefore: key ', e.target.key, ', keys ', e.keys);
          } else if (e.target.dropPosition === 'after') {
            console.log('moveAfter: key ', e.target.key, ', keys ', e.keys);
          }
        },
      });

      return (
        <>
          <Story args={{ ...Default.args, dragAndDropHooks }} />
        </>
      );
    },
  ],
  args: {
    ...Default.args,
  },
};

/**
 * Use the `resizableColumns` prop to make the columns resizable.
 */
export const ResizableColumns: Story = {
  args: {
    ...Default.args,
    resizableColumns: true,
  },
};
