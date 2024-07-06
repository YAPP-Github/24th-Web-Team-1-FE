import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import {
    MessageOnlyResponse,
  SubscribeBody,
  SubscribeParams,
} from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from "./api";

export const subscribeWorkbook = (
  params: SubscribeParams,
  body: SubscribeBody,
): Promise<ApiResponse<MessageOnlyResponse>> => {
  return axiosRequest("post", API_ROUTE.SUBSCRIBE(params.workbookId), body);
};

export const subscribeWorkbookOptions = (
    params: SubscribeParams
): UseMutationOptions<
    ApiResponse<MessageOnlyResponse>,
    Error, 
    SubscribeBody
> => {
    return {
        mutationKey: [QUERY_KEY.SUBSCRIBE_WORKBOOK, params.workbookId],
        mutationFn: (body) => subscribeWorkbook(params, body)
    };
}
