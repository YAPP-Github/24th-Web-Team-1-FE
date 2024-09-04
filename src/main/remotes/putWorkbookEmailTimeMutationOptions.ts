import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { MessageOnlyResponse } from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from ".";

const putWorkbookEmailTime = ({
  time,
}: {
  time: string;
}): Promise<ApiResponse<MessageOnlyResponse>> => {
  return fewFetch().put(API_ROUTE.WORKBOOK_EMAIL_TIME, {
    body: JSON.stringify({ time }),
  });
};

export const putWorkbookEmailTimeMutationOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  {
    time: string;
  }
> => {
  return {
    mutationKey: [QUERY_KEY.PUT_WORKBOOK_EMAIL_TIME],
    mutationFn: ({ time }) => putWorkbookEmailTime({ time }),
  };
};
