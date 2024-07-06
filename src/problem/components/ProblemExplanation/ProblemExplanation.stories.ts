import ProblemExplanation from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProblemExplanation,
} satisfies Meta<typeof ProblemExplanation>;
export default meta;

type Story = StoryObj<typeof meta>;
// TODO : useQuery 연결해서 데이터 잘 보여지는지 테스트 필요
export const InitChoiceAnswer = {
  args: {
    className: "mt-[39px]",
  },
} satisfies Story;
