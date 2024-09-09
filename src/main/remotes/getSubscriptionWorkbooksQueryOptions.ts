import { ApiResponse, fewFetch } from "@api/fewFetch";
import {
  WorkbookServerInfoListRes,
  WorkbookSubscriptionInfo,
} from "@main/types/workbook";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";
import { PageType } from "@shared/types/view";

const getSubscriptionWorkbooks = ({
  pageType,
}: {
  pageType?: PageType;
}): Promise<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionInfo>>
> => {
  return fewFetch().get(API_ROUTE.SUBSCRIBE_WORKBOOKS({ pageType }));
};

export const getSubscriptionWorkbooksQueryOptions = ({
  pageType,
}: {
  pageType?: PageType;
}): UseQueryOptions<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionInfo>>,
  unknown,
  WorkbookSubscriptionInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_SUBSCRIBE_WORKBOOKS, pageType],
    queryFn: () => getSubscriptionWorkbooks({ pageType }),
    select: (data) => data.data.data.workbooks,
  };
};
