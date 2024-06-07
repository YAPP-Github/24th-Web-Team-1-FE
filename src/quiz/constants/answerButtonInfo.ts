import { ButtonInfo } from "@quiz/types/answerButtonInfo";

export const BUTTON_STATE = [
  "PRE_ANSWER_SELECT",
  "POST_ANSWER_PRE_SUBMIT",
  "POST_SUBMIT",
] as const;

export const BUTTON_INFO: ButtonInfo = {
  PRE_ANSWER_SELECT: {
    title: "정답 제출하기",
    className: "bg-text-gray3 text-text-gray2",
  },
  POST_ANSWER_PRE_SUBMIT: {
    title: "정답 제출하기",
    className: "bg-main",
  },
  POST_SUBMIT: {
    title: "다음 문제 풀기",
    className: "bg-text-black",
  },
};
