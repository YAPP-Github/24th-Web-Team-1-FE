import { Meta, StoryObj } from "@storybook/react";
import WorkbookCardList from "../WorkbookCardList";

export default {
  title: "메인 페이지 / 워크북 카드 리스트",
  component: WorkbookCardList,
} as Meta<typeof WorkbookCardList>;

type Story = StoryObj<typeof WorkbookCardList>;

export const Default = {} satisfies Story;
