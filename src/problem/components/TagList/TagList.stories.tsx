import TagList from ".";
import { tagsHandler } from "@mocks/worker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TagList,
} satisfies Meta<typeof TagList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TagComponent = {
  parameters: {
    msw: {
      handlers: {
        quiz: tagsHandler,
      },
    },
  },
} satisfies Story;
