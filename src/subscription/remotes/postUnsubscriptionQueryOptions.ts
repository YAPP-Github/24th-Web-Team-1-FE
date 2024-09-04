import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import {
  MessageOnlyResponse,
  UnsubscribeBody,
} from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from "./api";

export const unsubscribeWorkbook = (
  body: UnsubscribeBody,
): Promise<ApiResponse<MessageOnlyResponse>> => {
  return fewFetch().post(API_ROUTE.UNSUBSCRIBE(), {
    body: JSON.stringify(body),
  });
};

export const unsubscribeWorkbookOptions = (
  email: string | null,
): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  UnsubscribeBody
> => {
  return {
    mutationKey: [QUERY_KEY.UNSUBSCRIBE_WORKBOOK, email],
    mutationFn: (body) => unsubscribeWorkbook(body),
  };
};
