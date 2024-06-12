import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { apiRoutes } from "@shared/constants/apiRoutes";
import { WorkbookInfo } from "@workbook/types";
import { buildUrl } from "@workbook/utils";

interface WorkbookParam {
  workbookId: number
}

const getWorkbook = async ({ workbookId }: WorkbookParam): Promise<WorkbookInfo> => {
  const url = buildUrl(apiRoutes.workbook, { workbookId });

  const response = await axiosRequest<ApiResponse<WorkbookInfo>>("get", url)

  return response.data
};

export const getWorkbookQueryOptions = (workbookId: number): UseQueryOptions<
  unknown,
  unknown,
  WorkbookInfo
> => {
  return {
    queryKey: ["get-workbook", workbookId],
    queryFn: () => getWorkbook({ workbookId })
  };
};
