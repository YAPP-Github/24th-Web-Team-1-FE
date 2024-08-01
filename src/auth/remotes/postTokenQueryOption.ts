import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { API_ROUTE, QUERY_KEY } from "./api";
import { AnswerCheckInfo, ProblemAnswerBody } from "@problem/types/problemInfo";

export const postToken = (
  params: TokenParams,
): Promise<ApiResponse<AnswerCheckInfo>> => {
  return fewFetch().post(API_ROUTE.TOKEN(params.auth_token));
};
export const postProblemAnswerMutationOptions = (
  params: TokenParams,
): UseMutationOptions<
  ApiResponse<AnswerCheckInfo>,
  Error,
  ProblemAnswerBody
> => {
  return {
    mutationKey: [QUERY_KEY.TOKEN, params.auth_token],
    mutationFn: () => postToken(params),
  };
};

type TokenParams = {
  auth_token: string;
};
