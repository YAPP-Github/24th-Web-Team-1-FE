import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";

import { WorkbookInfo } from "@workbook/types";
import { buildUrl } from "@workbook/utils";

interface WorkbookParam {
  workbookId: number;
}

const getWorkbook = async ({
  workbookId,
}: WorkbookParam): Promise<ApiResponse<WorkbookInfo>> => {
  const url = buildUrl(apiRoutes.workbook, { workbookId });
  return axiosRequest("get", url);
};

export const getWorkbookQueryOptions = (
  workbookId: number,
): UseQueryOptions<ApiResponse<WorkbookInfo>, unknown, WorkbookInfo> => {
  return {
    queryKey: ["get-workbook", workbookId],
    queryFn: () => getWorkbook({ workbookId }),
    select: (data) => data.data,
  };
};
