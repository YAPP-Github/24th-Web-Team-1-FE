import { UseMutationOptions } from "@tanstack/react-query";

import {
  MessageOnlyResponse,
  SubscribeParams,
} from "@subscription/types/subscription";

import { ApiResponse, FewError, fewFetch } from "@api/fewFetch";
import { API_ROUTE, QUERY_KEY } from "./api";

export const subscribeWorkbook = ({
  workbookId,
}: Pick<SubscribeParams, "workbookId">): Promise<
  ApiResponse<MessageOnlyResponse>
> => {
  return fewFetch().post(API_ROUTE.SUBSCRIBE(workbookId));
};

export const subscribeWorkbookOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  ApiResponse<FewError>,
  Pick<SubscribeParams, "workbookId">
> => {
  return {
    mutationKey: [QUERY_KEY.SUBSCRIBE_WORKBOOK],
    mutationFn: ({ workbookId }) => subscribeWorkbook({ workbookId }),
  };
};
