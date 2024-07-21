import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { LogData } from "@shared/types";
import { API_ROUTE, QUERY_KEY } from ".";

export const postLog = (history: LogData): Promise<ApiResponse<object>> => {
  return fewFetch().post(API_ROUTE.LOGS(), {
    body: JSON.stringify({
      history: JSON.stringify(history),
    }),
  });
};

export const postLogMutationOptions = (): UseMutationOptions<
  ApiResponse<object>,
  Error,
  LogData
> => {
  return {
    mutationKey: [QUERY_KEY.POST_LOG],
    mutationFn: (history) => postLog(history),
  };
};
