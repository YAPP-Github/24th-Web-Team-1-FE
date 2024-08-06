import { ApiResponse, fewFetch } from "@api/fewFetch";
import {
  WorkbookServerInfoListRes,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getSubscriptionWorkbooks = (): Promise<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionInfo>>
> => {
  return fewFetch().get(API_ROUTE.SUBSCRIBE_WORKBOOKS);
};

export const getSubscriptionWorkbooksQueryOptions = (): UseQueryOptions<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionInfo>>,
  unknown,
  WorkbookSubscriptionInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_SUBSCRIBE_WORKBOOKS],
    queryFn: () => getSubscriptionWorkbooks(),
    select: (data) => data.data.data.workbooks,
  };
};
