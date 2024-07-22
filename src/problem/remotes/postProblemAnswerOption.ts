import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { AnswerCheckInfo, ProblemAnswerBody } from "@problem/types/problemInfo";
import { API_ROUTE, QUERY_KEY } from "./api";

export const postProblemAnswer = (
  params: ProblemAnswerParams,
  body: ProblemAnswerBody,
): Promise<ApiResponse<AnswerCheckInfo>> => {
  return fewFetch().post(API_ROUTE.PROBLEM(params.problemId), {
    body: JSON.stringify(body),
  });
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
