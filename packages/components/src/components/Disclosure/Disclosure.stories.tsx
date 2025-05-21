import * as React from 'react';
import { Disclosure } from './Disclosure';
import {
  Button,
  DisclosurePanel as DisclosurePanel,
} from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Disclosure.css';

const meta = {
  component: Disclosure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Disclosure {...args}>
      <h3>
        <Button slot="trigger">
          <svg viewBox="0 0 24 24">
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          System Requirements
        </Button>
      </h3>
      <DisclosurePanel>
        <p>Details about system requirements here.</p>
      </DisclosurePanel>
    </Disclosure>
  ),
};
