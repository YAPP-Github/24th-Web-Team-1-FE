import {
  ANSWER_CHOICHE_TYPE,
  QUIZ_ANSWER_TYPE,
} from "@quiz/constants/quizInfo";

import { ConstKeyObject } from "@common/types/constKeyObject";

export type QuizTitleInfo = ConstKeyObject<
  (typeof QUIZ_ANSWER_TYPE)[number],
  React.HTMLAttributes<HTMLHeadElement>
>;

export type QuizAnswer = {
  answer: string;
};

export type QuizInfo = {
  question: string;
  answers: string[];
};

export type AnswerChoiceButtonInfo = ConstKeyObject<
  (typeof ANSWER_CHOICHE_TYPE)[number],
  React.HTMLAttributes<HTMLButtonElement>
>;
