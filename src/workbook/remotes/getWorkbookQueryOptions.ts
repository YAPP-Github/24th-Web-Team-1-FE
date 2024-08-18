import { UseQueryOptions } from "@tanstack/react-query";

import { WorkbookClientInfo, WorkbookServerInfo } from "@workbook/types";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { WebpBrowser } from "@shared/types/image";
import { WorkbookInfolModel } from "@workbook/model/WorkbookInfoModel";
import { API_ROUTE, QUERY_KEY } from "./api";

interface WorkbookParam {
  workbookId: string;
}

export const getWorkbook = async ({
  workbookId,
}: WorkbookParam): Promise<ApiResponse<WorkbookServerInfo>> => {
  return fewFetch().get(API_ROUTE.WORKBOOK(workbookId));
};

export const getWorkbookQueryOptions = ({
  workbookId,
  isWebpBrowser,
}: WorkbookParam & WebpBrowser): UseQueryOptions<
  ApiResponse<WorkbookServerInfo>,
  unknown,
  WorkbookClientInfo
> => {
  return {
    queryKey: [QUERY_KEY.GET_WORKBOOK, workbookId],
    queryFn: () => getWorkbook({ workbookId }),
    select: (data) => {
      const workbookServerInfo = data.data.data;
      const workbookInfolModel = new WorkbookInfolModel({
        initWorkbookServerInfo: workbookServerInfo,
        initWebpBrowser: { isWebpBrowser },
      });
      return workbookInfolModel.workbookClientInfo;
    },
  };
};
