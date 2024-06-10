import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { PROBLEM_API_ROUTES } from "./api";
import { ProblemAnswer } from "@problem/types/problemInfo";

export const postProblemAnswer = (
  params: ProblemAnswerParams,
  body: ProblemAnswerBody,
): Promise<ApiResponse<ProblemAnswer>> => {
  return axiosRequest(
    "post",
    PROBLEM_API_ROUTES.submitAnswer(params.problemId),
    body,
  );
};
export const postProblemAnswerMutationOptions = (
  params: ProblemAnswerParams,
): UseMutationOptions<ApiResponse<ProblemAnswer>, Error, ProblemAnswerBody> => {
  return {
    mutationKey: ["get-answer"],
    mutationFn: (body) => postProblemAnswer(params, body),
  };
};

type ProblemAnswerParams = {
  problemId: number;
};

type ProblemAnswerBody = {
  choiceAns: number;
};
