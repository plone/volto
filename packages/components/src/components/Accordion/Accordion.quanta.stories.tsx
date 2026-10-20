import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
} from './Accordion.quanta';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronrightIcon } from '../../components/icons';

const meta = {
  title: 'Quanta/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqs = [
  {
    q: 'How do I reset my password?',
    a: "You can reset your password by going to the settings page and clicking on 'Reset Password'.",
  },
  {
    q: 'Can I change my subscription plan?',
    a: 'Yes, you can upgrade or downgrade your subscription plan at any time from your account settings.',
  },
  {
    q: 'Where can I view my past orders?',
    a: "Your past orders can be viewed in the 'Orders' section of your account dashboard.",
  },
  {
    q: 'What is the return policy?',
    a: 'Our return policy allows you to return products within 30 days of purchase for a full refund or exchange.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can contact customer support via email at support@example.com or through our online chat system.',
  },
];

export const Default: Story = {
  render: (args) => (
    <Accordion className="w-3xl" {...args}>
      {faqs.map((item, index) => (
        <AccordionItem key={index} id={index}>
          <AccordionItemTrigger>{item.q}</AccordionItemTrigger>
          <AccordionPanel>{item.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  args: {
    defaultExpandedKeys: [1],
  },
};

export const AllowMultipleExpanded: Story = {
  render: Default.render,
  args: {
    allowsMultipleExpanded: true,
    defaultExpandedKeys: [1, 2],
  },
};

const items = [
  {
    id: 1,
    title: 'Clothing Categories',
    description: 'Explore our wide range of clothing options for every season.',
    children: [
      {
        id: 101,
        title: "Men's Wear",
        description: 'Stylish and comfortable outfits for men.',
      },
      {
        id: 102,
        title: "Women's Wear",
        description: 'Elegant and trendy fashion for women.',
      },
      {
        id: 103,
        title: "Kids' Wear",
        description: 'Colorful and playful clothing for kids.',
      },
    ],
  },
  {
    id: 2,
    title: 'Electronics',
    description: 'Discover the latest in technology and gadgets.',
    children: [
      {
        id: 201,
        title: 'Smartphones',
        description: 'Top brands and the latest models.',
      },
      {
        id: 202,
        title: 'Laptops',
        description: 'High-performance laptops for work and play.',
      },
      {
        id: 203,
        title: 'Accessories',
        description: 'Chargers, cases, and other must-have gadgets.',
      },
    ],
  },
  {
    id: 3,
    title: 'Home & Living',
    description: 'Everything you need to make your house a home.',
    children: [
      {
        id: 301,
        title: 'Furniture',
        description: 'Comfortable and stylish furniture for every room.',
      },
      {
        id: 302,
        title: 'Decor',
        description: 'Beautiful decor items to personalize your space.',
      },
      {
        id: 303,
        title: 'Kitchen Essentials',
        description: 'Practical and modern kitchen tools.',
      },
    ],
  },
];

export const Nested: Story = {
  render: (args) => (
    <Accordion
      className={`
        w-3xl rounded-xl border
        **:data-[slot=disclosure]:last:border-b-0
      `}
      {...args}
    >
      {items.map((item, index) => (
        <AccordionItem key={index} id={index}>
          <AccordionItemTrigger className="px-4">
            {item.title}
          </AccordionItemTrigger>
          <AccordionPanel className="bg-muted">
            <Accordion allowsMultipleExpanded>
              {item.children.map((child, childIndex) => (
                <AccordionItem key={childIndex} id={childIndex}>
                  <AccordionItemTrigger className="group">
                    <span>
                      <ChevronrightIcon
                        className={`
                          size-5 duration-300
                          group-aria-expanded:rotate-90
                        `}
                      />
                      {child.title}
                    </span>
                  </AccordionItemTrigger>
                  <AccordionPanel>{child.description}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  args: {
    defaultExpandedKeys: [1],
  },
};
