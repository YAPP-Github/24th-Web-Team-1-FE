import { ApiResponse, fewFetch } from "@api/fewFetch";
import { CategoryClientInfo } from "@common/types/category";
import {
  WorkbookServerInfo,
  WorkbookServerInfoListRes,
} from "@main/types/workbook";
import { UseQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getWorkbooksWithCategory = ({
  code,
}: {
  code: CategoryClientInfo["code"];
}): Promise<ApiResponse<WorkbookServerInfoListRes<WorkbookServerInfo>>> => {
  return fewFetch().get(API_ROUTE.WORKBOOKS_WITH_CATEGORY({ code }));
};

export const getWorkbooksWithCategoryQueryOptions = ({
  code,
}: {
  code: CategoryClientInfo["code"];
}): UseQueryOptions<
  ApiResponse<WorkbookServerInfoListRes<WorkbookServerInfo>>,
  unknown,
  WorkbookServerInfo[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_WORKBOOKS_WITH_CATEGORY, code],
    queryFn: () => getWorkbooksWithCategory({ code }),
    select: (data) => data.data.data.workbooks,
  };
};
