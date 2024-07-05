import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { LogData } from "@shared/types";
import { API_ROUTE, QUERY_KEY } from ".";

export const postLog = (
  history: PostLogBody,
): Promise<ApiResponse<unknown>> => {
  return axiosRequest("post", API_ROUTE.LOGS(), history);
};

export const postLogMutationOptions = (): UseMutationOptions<
  ApiResponse<unknown>,
  Error,
  PostLogBody
> => {
  return {
    mutationKey: [QUERY_KEY.POST_LOG],
    mutationFn: (history) => postLog(history),
  };
};

type PostLogBody = {
  history: LogData;
};
