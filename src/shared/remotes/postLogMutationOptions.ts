import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { LogData } from "@shared/types";
import { API_ROUTE, QUERY_KEY } from ".";

export const postLog = (history: LogData): Promise<ApiResponse<unknown>> => {
  return axiosRequest("post", API_ROUTE.LOGS(), {
    history: JSON.stringify(history),
  });
};

export const postLogMutationOptions = (): UseMutationOptions<
  ApiResponse<unknown>,
  Error,
  LogData
> => {
  return {
    mutationKey: [QUERY_KEY.POST_LOG],
    mutationFn: (history) => postLog(history),
  };
};
