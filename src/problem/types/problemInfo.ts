import { ApiResponse } from "@api/api-config";
import { ConstKeyObject } from "@common/types/constKeyObject";
import {
  ANSWER_CHOICHE_TYPE,
  PROBLEM_ANSWER_TYPE,
} from "@problem/constants/problemInfo";

export type ProblemTitleInfo = ConstKeyObject<
  (typeof PROBLEM_ANSWER_TYPE)[number],
  React.HTMLAttributes<HTMLHeadElement>
>;
export type ProblemListInfo = number;
export type ProblemParams = {
  problemId: string;
};
export type PromblemServerInfo = {
  id: number;
  title: string;
  day: string;
  contents: AnswerChoiceServerInfo[];
};
export type PromblemClientInfo = {
  contents: AnswerChoiceClientInfo[];
} & Omit<PromblemServerInfo, "contents">;

export type AnswerChoiceServerInfo = {
  number: number;
  content: string;
};
export type AnswerChoiceClientInfo = {
  number: string;
} & Omit<AnswerChoiceServerInfo, "number">;

export type AnswerChoiceButtonInfo = ConstKeyObject<
  (typeof ANSWER_CHOICHE_TYPE)[number],
  React.HTMLAttributes<HTMLButtonElement>
>;

export type AnswerCheckInfo = {
  explanation: string;
  isSolved: boolean;
  answer: string;
};

export type ProblemAnswerBody = {
  choiceAns: string;
};

export type ProblemAnswerMuationState = {
  data: ApiResponse<AnswerCheckInfo>;
  variables: ProblemAnswerBody;
};
