import AnswerChoiceButton from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AnswerChoiceButton,
} satisfies Meta<typeof AnswerChoiceButton>;
export default meta;

type Story = StoryObj<typeof meta>;

// TODO : msw 사용해서 다르게 보여주는 story 작성 필요
export const InitChoiceAnswer = {
  args: {
    // className: ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className,
    content: "유동성",
  },
} satisfies Story;

export const CurrentChoiceAnswer = {
  args: {
    // className: ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER.className,
    content: "유동성",
  },
} satisfies Story;

export const ChoiceAnswerCorrect = {
  args: {
    // className: ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT.className,
    content: "유동성",
  },
} satisfies Story;

export const ChoiceAnswerFail = {
  args: {
    // className: ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL.className,
    content: "유동성",
  },
} satisfies Story;
