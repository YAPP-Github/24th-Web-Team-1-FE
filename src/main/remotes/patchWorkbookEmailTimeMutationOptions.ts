import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { MessageOnlyResponse } from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from ".";

const patchWorkbookEmailTime = ({
  time,
}: {
  time: string;
}): Promise<ApiResponse<MessageOnlyResponse>> => {
  return fewFetch().patch(API_ROUTE.WORKBOOK_EMAIL_TIME, {
    body: JSON.stringify({ time }),
  });
};

export const patchWorkbookEmailTimeMutationOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  {
    time: string;
  }
> => {
  return {
    mutationKey: [QUERY_KEY.PATCH_WORKBOOK_EMAIL_TIME],
    mutationFn: ({ time }) => patchWorkbookEmailTime({ time }),
  };
};
