import { ConstKeyObject } from "@common/types/constKeyObject";
import {
  ANSWER_CHOICHE_TYPE,
  PROBLEM_ANSWER_TYPE,
} from "@problem/constants/problemInfo";

export type ProblemTitleInfo = ConstKeyObject<
  (typeof PROBLEM_ANSWER_TYPE)[number],
  React.HTMLAttributes<HTMLHeadElement>
>;

export type PromblemInfo = {
  id: number;
  title: string;
  day: string;
  contents: AnswerChoiceInfo[];
};
export type AnswerChoiceInfo = {
  number: number;
  content: string;
};

export type AnswerChoiceButtonInfo = ConstKeyObject<
  (typeof ANSWER_CHOICHE_TYPE)[number],
  React.HTMLAttributes<HTMLButtonElement>
>;

export type AnswerCheckInfo = {
  explanation: string;
  isSolved: boolean;
  answer: string;
};
