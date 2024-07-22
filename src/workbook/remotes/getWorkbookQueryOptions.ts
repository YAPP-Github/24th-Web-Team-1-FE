import { UseQueryOptions } from "@tanstack/react-query";

import { WorkbookInfo } from "@workbook/types";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { API_ROUTE, QUERY_KEY } from "./api";

interface WorkbookParam {
  workbookId: string;
}

export const getWorkbook = async ({
  workbookId,
}: WorkbookParam): Promise<ApiResponse<WorkbookInfo>> => {
  return fewFetch().get(API_ROUTE.WORKBOOK(workbookId));
};

export const getWorkbookQueryOptions = (
  workbookId: string,
): UseQueryOptions<ApiResponse<WorkbookInfo>, unknown, WorkbookInfo> => {
  return {
    queryKey: [QUERY_KEY.GET_WORKBOOK, workbookId],
    queryFn: () => getWorkbook({ workbookId }),
    select: (data) => data.data.data,
  };
};
