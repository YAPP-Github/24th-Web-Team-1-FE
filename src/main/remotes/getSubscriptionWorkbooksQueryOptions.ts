import { ApiResponse, fewFetch } from "@api/fewFetch";
import {
  WorkbookServerInfoListRes,
  WorkbookSubscriptionServerInfo,
} from "@main/types/workbook";
import { PageType } from "@shared/types/view";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getSubscriptionWorkbooks = ({
  pageType,
}: {
  pageType?: PageType;
}): Promise<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionServerInfo>>
> => {
  return fewFetch().get(API_ROUTE.SUBSCRIBE_WORKBOOKS({ pageType }));
};

export const getSubscriptionWorkbooksQueryOptions = ({
  pageType,
}: {
  pageType?: PageType;
}): UseQueryOptions<
  ApiResponse<WorkbookServerInfoListRes<WorkbookSubscriptionServerInfo>>,
  unknown,
  WorkbookSubscriptionServerInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_SUBSCRIBE_WORKBOOKS, pageType],
    queryFn: () => getSubscriptionWorkbooks({ pageType }),
    select: (data) => data.data.data.workbooks,
  };
};
