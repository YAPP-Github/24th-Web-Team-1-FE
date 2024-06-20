import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { WorkbookInfo } from "@workbook/types";

import { API_ROUTE, QUERY_KEY } from "./api";

interface WorkbookParam {
  workbookId: string;
}

const getWorkbook = async ({
  workbookId,
}: WorkbookParam): Promise<ApiResponse<WorkbookInfo>> => {
  return axiosRequest("get", (API_ROUTE.WORKBOOK(workbookId)))
};

export const getWorkbookQueryOptions = (
  workbookId: string,
): UseQueryOptions<ApiResponse<WorkbookInfo>, unknown, WorkbookInfo> => {
  return {
    queryKey: [QUERY_KEY.GET_WORKBOOK, workbookId],
    queryFn: () => getWorkbook({ workbookId }),
    select: (data) => data.data,
  };
};
