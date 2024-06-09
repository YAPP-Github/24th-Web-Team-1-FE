import { QuizTitleInfo } from "@quiz/types/quizTitle";

export const QUIZ_ANSWER_TYPE = [
  "NO_ANSWER",
  "ANSWER_CORRECT",
  "ANSWER_FAIL",
] as const;

export const QUIZ_TITLE_INFO: QuizTitleInfo = {
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
