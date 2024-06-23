import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { API_ROUTE, QUERY_KEY } from "./api";
import { AnswerCheckInfo, ProblemAnswerBody } from "@problem/types/problemInfo";

export const postProblemAnswer = (
  params: ProblemAnswerParams,
  body: ProblemAnswerBody,
): Promise<ApiResponse<AnswerCheckInfo>> => {
  return axiosRequest("post", API_ROUTE.PROBLEM(params.problemId), body);
};
export const postProblemAnswerMutationOptions = (
  params: ProblemAnswerParams,
): UseMutationOptions<
  ApiResponse<AnswerCheckInfo>,
  Error,
  ProblemAnswerBody
> => {
  return {
    mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER, params.problemId],
    mutationFn: (body) => postProblemAnswer(params, body),
  };
};

type ProblemAnswerParams = {
  problemId: string;
};
