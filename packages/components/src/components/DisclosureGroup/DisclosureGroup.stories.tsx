import * as React from 'react';
import { DisclosureGroup } from './DisclosureGroup';
import {
  Button,
  Disclosure as Disclosure,
  DisclosurePanel as DisclosurePanel,
} from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: DisclosureGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DisclosureGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <DisclosureGroup {...args}>
      <Disclosure id="personal">
        <h3>
          <Button slot="trigger">
            <svg viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Personal Information
          </Button>
        </h3>
        <DisclosurePanel>
          <p>Personal information form here.</p>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="billing">
        <h3>
          <Button slot="trigger">
            <svg viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Billing Address
          </Button>
        </h3>
        <DisclosurePanel>
          <p>Billing address form here.</p>
        </DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  ),
};

Default.args = {
  defaultExpandedKeys: ['personal'],
};
