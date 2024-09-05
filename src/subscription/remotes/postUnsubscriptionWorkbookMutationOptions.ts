import { UseMutationOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { MessageOnlyResponse } from "@subscription/types/subscription";

import { SubscriptionManagementClientInfo } from "./../../main/types/workbook";
import { API_ROUTE, QUERY_KEY } from "./api";

const unsubscriptionWorkbook = ({
  workbookId,
}: Pick<SubscriptionManagementClientInfo, "workbookId">): Promise<
  ApiResponse<MessageOnlyResponse>
> => {
  return fewFetch().post(API_ROUTE.UNSUBSCRIBE_WORKBOOK({ workbookId }));
};
export const postUnsubscriptionWorkbookMutationOptions = (): UseMutationOptions<
  ApiResponse<MessageOnlyResponse>,
  Error,
  Pick<SubscriptionManagementClientInfo, "workbookId">
> => {
  return {
    mutationKey: [QUERY_KEY.UNSUBSCRIBE_WORKBOOK],
    mutationFn: ({ workbookId }) => unsubscriptionWorkbook({ workbookId }),
  };
};
