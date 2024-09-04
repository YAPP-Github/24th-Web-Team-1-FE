import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { MessageOnlyResponse } from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from ".";

const putWorkbookEmailDay = ({
  date,
}: {
  date: string;
}): Promise<ApiResponse<MessageOnlyResponse>> => {
  return fewFetch().put(API_ROUTE.WORKBOOK_EMAIL_DAY, {
    body: JSON.stringify({ date }),
  });
};

export const putWorkbookEmailDayMutationOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  {
    date: string;
  }
> => {
  return {
    mutationKey: [QUERY_KEY.PUT_WORKBOOK_EMAIL_TIME],
    mutationFn: ({ date }) => putWorkbookEmailDay({ date }),
  };
};
