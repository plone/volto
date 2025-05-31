import React from 'react';
import type { Meta } from '@storybook/react';
import { DialogTrigger, Heading } from 'react-aria-components';
import { Button, Dialog, Popover } from '@plone/components';
import { InfoIcon } from '../../components/icons';

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    showArrow: true,
  },
};

export default meta;

export const Example = (args: any) => (
  <DialogTrigger>
    <Button aria-label="Help">
      <InfoIcon />
    </Button>
    <Popover {...args} className="max-w-[250px]">
      <Dialog>
        <Heading slot="title" className="mb-2 text-lg font-semibold">
          Help
        </Heading>
        <p className="text-sm">
          For help accessing your account, please contact support.
        </p>
      </Dialog>
    </Popover>
  </DialogTrigger>
);
