import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { ArticleWithWorkbookDetail } from "@article/types";

import { API_ROUTE, QUERY_KEY } from "./api";

export const getArticleWithWorkbookInfo = ({
  workbookId,
  articleId,
}: ArticleWithWorkbookInfoParams): Promise<
  ApiResponse<ArticleWithWorkbookDetail>
> => {
  return axiosRequest(
    "get",
    API_ROUTE.ARTICLE_WITH_WORKBOOK({ workbookId, articleId }),
  );
};
export const getArticleWithWorkbookQueryOptions = ({
  workbookId,
  articleId,
}: ArticleWithWorkbookInfoParams): UseQueryOptions<
  ApiResponse<ArticleWithWorkbookDetail>,
  Error,
  ArticleWithWorkbookDetail
> => {
  return {
    queryKey: [QUERY_KEY.GET_ARTICLE, articleId],
    queryFn: () => getArticleWithWorkbookInfo({ workbookId, articleId }),
    select: (data) => data.data,
  };
};

type ArticleWithWorkbookInfoParams = {
  workbookId: string | null;
  articleId: string;
};
