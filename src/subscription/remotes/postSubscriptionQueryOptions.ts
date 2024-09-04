import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, FewError, fewFetch } from "@api/fewFetch";

import {
  MessageOnlyResponse,
  SubscribeParams,
} from "@subscription/types/subscription";

import { API_ROUTE, QUERY_KEY } from "./api";

export const subscribeWorkbook = ({
  workbookId,
}: Pick<SubscribeParams, "workbookId">): Promise<
  ApiResponse<MessageOnlyResponse>
> => {
  return fewFetch().post(API_ROUTE.SUBSCRIBE(workbookId));
};

export const subscribeWorkbookQueryOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  ApiResponse<FewError>,
  Pick<SubscribeParams, "workbookId">
> => {
  return {
    mutationKey: [QUERY_KEY.SUBSCRIBE_WORKBOOK],
    mutationFn: ({ workbookId }) => subscribeWorkbook({ workbookId }),
  };
};
