import { QUIZ_ANSWER_TYPE } from "@quiz/constants/quizTitle";

import { ConstKeyObject } from "@common/types/constKeyObject";

export type QuizTitleInfo = ConstKeyObject<
  (typeof QUIZ_ANSWER_TYPE)[number],
  React.HTMLAttributes<HTMLHeadElement>
>;

export type QuizAnswer = {
  answer: string;
};
