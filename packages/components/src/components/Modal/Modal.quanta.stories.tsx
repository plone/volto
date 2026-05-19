import React from 'react';
import { Modal } from './Modal.quanta';
import { Button } from '../Button/Button.quanta';
import { Dialog } from '../Dialog/Dialog.quanta';
import { Form } from '../Form/Form.quanta';
import { TextField } from '../TextField/TextField.quanta';

import { DialogTrigger, Heading } from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Modal',
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
      <Button variant="primary" accent>
        Sign up…
      </Button>
      <Modal {...args}>
        <Dialog>
          {({ close }) => (
            <Form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus label="First name:" />
              <TextField label="Last name:" />
              <Button variant="primary" accent onPress={close}>
                Submit
              </Button>
            </Form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
};
