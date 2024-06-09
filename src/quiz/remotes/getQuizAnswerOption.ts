import { UseQueryOptions } from "@tanstack/react-query";

import { axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { QuizAnswer } from "@quiz/types/quizTitle";

export const getQuizAnswer = (): Promise<QuizAnswer> => {
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
