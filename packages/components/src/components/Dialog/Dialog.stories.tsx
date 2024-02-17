import React from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import {
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Dialog.css';

const meta = {
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button>Sign up…</Button>
      <Modal>
        <Dialog {...args}>
          {({ close }) => (
            <form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name</Label>
                <Input />
              </TextField>
              <Button onPress={close} style={{ marginTop: 8 }}>
                Submit
              </Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
};
