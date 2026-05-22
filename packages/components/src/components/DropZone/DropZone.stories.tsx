import React, { useState } from 'react';
import { DropZone, Text as DropZoneText } from './DropZone';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/DropZone',
  component: DropZone,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => <div className="flex justify-center p-8">{Story()}</div>,
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Usage example that renders the DropZone shown below
 *
 * ```ts
 * import { useState } from 'react';
 * import { DropZone, DropZoneText } from '@plone/components';
 *
 * const [content, setContent] = useState<string | React.ReactElement | null>(
 *   null,
 * );
 *
 * <DropZone
 *   getDropOperation={(types) =>
 *     ['text/plain', 'image/jpeg', 'image/png', 'image.gif'].some((t) =>
 *       types.has(t),
 *     )
 *       ? 'copy'
 *       : 'cancel'
 *   }
 *   onDrop={async (event) => {
 *     // Find the first accepted item.
 *     const item = event.items.find(
 *       (item) =>
 *         (item.kind === 'text' && item.types.has('text/plain')) ||
 *         (item.kind === 'file' && item.type.startsWith('image/')),
 *     );
 *
 *     if (item?.kind === 'text') {
 *       const text = await item.getText('text/plain');
 *       setContent(text);
 *     } else if (item?.kind === 'file') {
 *       const file = await item.getFile();
 *       const url = URL.createObjectURL(file);
 *       setContent(
 *         <img
 *           src={url}
 *           alt={item.name}
 *           style={{ maxHeight: 100, maxWidth: '100%' }}
 *         />,
 *       );
 *     }
 *   }}
 * >
 *   <DropZoneText slot="label">
 *     {content || 'Drop or paste text or images here'}
 *   </DropZoneText>
 * </DropZone>
 * ```
 */
export const Default: Story = {
  render: (args: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [content, setContent] = useState<string | React.ReactElement | null>(
      null,
    );

    return (
      <DropZone
        getDropOperation={(types) =>
          ['text/plain', 'image/jpeg', 'image/png', 'image.gif'].some((t) =>
            types.has(t),
          )
            ? 'copy'
            : 'cancel'
        }
        onDrop={async (event) => {
          // Find the first accepted item.
          const item = event.items.find(
            (item) =>
              (item.kind === 'text' && item.types.has('text/plain')) ||
              (item.kind === 'file' && item.type.startsWith('image/')),
          );

          if (item?.kind === 'text') {
            const text = await item.getText('text/plain');
            setContent(text);
          } else if (item?.kind === 'file') {
            const file = await item.getFile();
            const url = URL.createObjectURL(file);
            setContent(
              <img
                src={url}
                alt={item.name}
                style={{ maxHeight: 100, maxWidth: '100%' }}
              />,
            );
          }
        }}
        {...args}
      >
        <DropZoneText slot="label">
          {content || 'Drop or paste text or images here'}
        </DropZoneText>
      </DropZone>
    );
  },
  args: {},
};
