import TopBar from ".";
import { StoryObj } from "@storybook/react";

const meta = {
  component: TopBar,
  tile: "Quiz/Article 공통 TopBar Component",
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: "기본",
  render: () => <TopBar />,
} satisfies Story;
