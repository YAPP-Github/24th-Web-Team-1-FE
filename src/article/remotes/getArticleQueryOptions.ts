import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { API_ROUTE, QUERY_KEY } from "./api";
import { ArticleDetail } from "@article/types";

export const getArticleInfo = ({
  articleId,
}: ArticleInfoParams): Promise<ApiResponse<ArticleDetail>> => {
  return axiosRequest("get", API_ROUTE.ARTICLE(articleId));
};
export const getArticleQueryOptions = ({
  articleId,
}: ArticleInfoParams): UseQueryOptions<
  ApiResponse<ArticleDetail>,
  Error,
  ArticleDetail
> => {
  return {
    queryKey: [QUERY_KEY.GET_ARTICLE, articleId],
    queryFn: () => getArticleInfo({ articleId }),
    select: (data) => data.data,
  };
};

type ArticleInfoParams = {
  articleId: string;
};
