import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { PROBLEM_API_ROUTES } from "./api";
import { AnswerCheckInfo } from "@problem/types/problemInfo";

export const postProblemAnswer = (
  params: ProblemAnswerParams,
  body: ProblemAnswerBody,
): Promise<ApiResponse<AnswerCheckInfo>> => {
  return axiosRequest(
    "post",
    PROBLEM_API_ROUTES.submitAnswer(params.problemId),
    body,
  );
};
export const postProblemAnswerMutationOptions = (
  params: ProblemAnswerParams,
): UseMutationOptions<
  ApiResponse<AnswerCheckInfo>,
  Error,
  ProblemAnswerBody
> => {
  return {
    mutationKey: ["get-problem-answer", params.problemId],
    mutationFn: (body) => postProblemAnswer(params, body),
  };
};

type ProblemAnswerParams = {
  problemId: number;
};

type ProblemAnswerBody = {
  choiceAns: string;
};
