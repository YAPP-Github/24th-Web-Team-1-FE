import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { QuizAnswer } from "@quiz/types/quizInfo";

export const getQuizAnswer = (): Promise<ApiResponse<QuizAnswer>> => {
  return axiosRequest("get", apiRoutes.quizAnswer);
};
export const getQuizAnswerQueryOptions = (): UseQueryOptions<
  unknown,
  Error,
  QuizAnswer
> => {
  return {
    queryKey: ["get-answer"],
    queryFn: () => getQuizAnswer(),
  };
};
