import { Button } from "@shared/components/ui/button";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithChoiceAnswer = {
  args: {
    className: "bg-main",
    children: "정답 제출하기",
  },
} satisfies Story;

export const WithoutChoiceAnswer = {
  args: {
    className: "bg-text-gray3",
    children: "정답 제출하기",
  },
} satisfies Story;

export const SubmitAnswer = {
  args: {
    className: "bg-text-black",
    children: "다음 문제 풀기",
  },
} satisfies Story;
