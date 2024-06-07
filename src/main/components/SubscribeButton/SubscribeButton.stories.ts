import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SubscribeButton from '.';
import { SUBSCRIBE_ACCEPT, SUBSCRIBE_REJECT } from '@main/constants/main';

const meta = {
  title: 'Example/SubscribeButton',
  component: SubscribeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    label: {
      control: 'text',
      description: 'Button label'
    },
    variant: {
      control: {
        type: 'select',
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"]
      },
      description: 'Button variant type',
    },
    className: {
      control: 'text',
      description: 'Styles'
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { handleClick: fn() },
} satisfies Meta<typeof SubscribeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reject: Story = {
  args: {
    label: SUBSCRIBE_REJECT,
    variant: "outline",
    className: "bg-white text-black font-medium text-[14px]"
  },
};

export const Accept: Story = {
  args: {
    label: SUBSCRIBE_ACCEPT,
    variant: "outline",
    className: "bg-black text-white font-medium text-[14px]"
  },
};