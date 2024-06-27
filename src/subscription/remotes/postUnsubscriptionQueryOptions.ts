import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import {
  MessageOnlyResponse,
  UnsubscribeBody,
} from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from "./api";

export const unsubscribeWorkbook = (
  body: UnsubscribeBody,
): Promise<ApiResponse<MessageOnlyResponse>> => {
  return axiosRequest("post", API_ROUTE.UNSUBSCRIBE(), body);
};

export const unsubscribeWorkbookOptions = (email: string | undefined): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  UnsubscribeBody
> => {
  return {
    mutationKey: [QUERY_KEY.UNSUBSCRIBE_WORKBOOK, email],
    mutationFn: (body) => unsubscribeWorkbook(body),
  };
};
