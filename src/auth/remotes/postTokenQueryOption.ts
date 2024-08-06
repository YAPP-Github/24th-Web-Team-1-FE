import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { API_ROUTE, QUERY_KEY } from "./api";
import { tokenResponse } from "@auth/types/auth";

export const postToken = (
  params: TokenParams,
): Promise<ApiResponse<tokenResponse>> => {
  return fewFetch().post(API_ROUTE.TOKEN(params.auth_token));
};
export const postTokenQueryOptions = (
  params: TokenParams,
  options?: UseMutationOptions<ApiResponse<tokenResponse>, Error, void>
): UseMutationOptions<
  ApiResponse<tokenResponse>,
  Error
> => {
  return {
    mutationKey: [QUERY_KEY.TOKEN, params.auth_token],
    mutationFn: () => postToken(params),
    ...options,
  };
};

type TokenParams = {
  auth_token: string;
};
