import {
  AnswerChoiceButtonInfo,
  ProblemTitleInfo,
} from "@problem/types/problemInfo";

export const PROBLEM_ANSWER_TYPE = [
  "NO_ANSWER",
  "ANSWER_CORRECT",
  "ANSWER_FAIL",
] as const;

export const PROBLEM_TITLE_INFO: ProblemTitleInfo = {
  NO_ANSWER: {
    title: "Q.",
    className: "text-main sub1-bold",
  },
  ANSWER_CORRECT: {
    title: "정답이에요!",
    className: "text-success sub1-semibold",
  },
  ANSWER_FAIL: {
    title: "아쉽지만 정답이 아니에요.",
    className: "text-error sub1-semibold",
  },
};

export const ANSWER_CHOICHE_TYPE = [
  "INIT_CHOICE_ANSWER",
  "CURRENT_CHOICE_ANSWER",
  "CHOICE_ANSWER_CORRECT",
  "CHOICE_ANSWER_FAIL",
] as const;
export const ANSWER_CHOICHE_BUTTON_INFO: AnswerChoiceButtonInfo = {
  INIT_CHOICE_ANSWER: {
    className: "bg-transparent text-black hover:bg-transparent",
  },
  CURRENT_CHOICE_ANSWER: {
    className: "text-white bg-main hover:bg-main",
  },
  CHOICE_ANSWER_CORRECT: {
    className:
      "bg-transparent text-success hover:bg-transparent border-success",
  },
  CHOICE_ANSWER_FAIL: {
    className: "bg-transparent text-error hover:bg-transparent border-error",
  },
};
