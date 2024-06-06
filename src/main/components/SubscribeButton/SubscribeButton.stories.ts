import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SubscribeButton from '.';
import { SUBSCRIBE_ACCEPT, SUBSCRIBE_REJECT } from '@main/constants/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/SubscribeButton',
  component: SubscribeButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { handleClick: fn() },
} satisfies Meta<typeof SubscribeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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