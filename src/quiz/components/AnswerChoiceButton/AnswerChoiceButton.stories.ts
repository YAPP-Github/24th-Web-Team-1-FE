import { ANSWER_CHOICHE_BUTTON_INFO } from "@quiz/constants/quizInfo";

import AnswerChoiceButton from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AnswerChoiceButton,
} satisfies Meta<typeof AnswerChoiceButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InitChoiceAnswer = {
  args: {
    className: ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className,
    title: "유동성",
  },
} satisfies Story;

export const CurrentChoiceAnswer = {
  args: {
    className: ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER.className,
    title: "유동성",
  },
} satisfies Story;

export const ChoiceAnswerCorrect = {
  args: {
    className: ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT.className,
    title: "유동성",
  },
} satisfies Story;

export const ChoiceAnswerFail = {
  args: {
    className: ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL.className,
    title: "유동성",
  },
} satisfies Story;
