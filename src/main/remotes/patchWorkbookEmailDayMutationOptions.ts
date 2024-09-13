import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { MessageOnlyResponse } from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from ".";

const patchWorkbookEmailDay = ({
  date,
}: {
  date: string;
}): Promise<ApiResponse<MessageOnlyResponse>> => {
  return fewFetch().patch(API_ROUTE.WORKBOOK_EMAIL_DAY, {
    body: JSON.stringify({ date }),
  });
};

export const patchWorkbookEmailDayMutationOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  {
    date: string;
  }
> => {
  return {
    mutationKey: [QUERY_KEY.PATCH_WORKBOOK_EMAIL_DAY],
    mutationFn: ({ date }) => patchWorkbookEmailDay({ date }),
  };
};
