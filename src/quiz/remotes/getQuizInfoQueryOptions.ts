import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { QuizInfo } from "@quiz/types/quizInfo";

export const getQuizInfo = (): Promise<ApiResponse<QuizInfo>> => {
  return axiosRequest("get", apiRoutes.quiz);
};
export const getQuizInfoQueryOptions = (): UseQueryOptions<
  unknown,
  Error,
  QuizInfo
> => {
  return {
    queryKey: ["get-quiz-info"],
    queryFn: () => getQuizInfo(),
  };
};
