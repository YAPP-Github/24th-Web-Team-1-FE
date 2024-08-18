import queryClient from "@api/queryClient";
import { PrefetchQuery } from "@common/types/prefetchQuery";
import { dehydrate } from "@tanstack/react-query";
import { WorkbookPageProps, WorkbookServerInfo } from "@workbook/types";
import { getWorkbookQueryOptions } from "./getWorkbookQueryOptions";

export const prefetchWorkbookQuery = async ({
  params,
}: WorkbookPageProps): Promise<PrefetchQuery<WorkbookServerInfo>> => {
  const workbookId = params.id;

  const { data: workbookInfo } = await queryClient.fetchQuery({
    ...getWorkbookQueryOptions({ workbookId, isWebpBrowser: true }),
  });
  return { data: workbookInfo.data, state: dehydrate(queryClient) };
};
