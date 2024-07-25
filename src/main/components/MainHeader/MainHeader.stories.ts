import { Meta, StoryObj } from "@storybook/react";
import MainHeader from ".";

const meta = {
  component: MainHeader,
} satisfies Meta<typeof MainHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InitHeader = {} satisfies Story;
