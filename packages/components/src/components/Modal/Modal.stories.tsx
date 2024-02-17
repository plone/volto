import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

import {
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  TextField,
} from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Modal.css';

const meta = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button>Sign up…</Button>
      <Modal {...args}>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name:</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name:</Label>
                <Input />
              </TextField>
              <Button onPress={close}>Submit</Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
};
