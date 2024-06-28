import TagList from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TagList,
} satisfies Meta<typeof TagList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TagComponent = {
  parameters: {},
} satisfies Story;
