import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { ArticleDetail } from "@article/types";
import { API_ROUTE, QUERY_KEY } from "./api";

export const getArticleInfo = ({
  articleId,
}: ArticleInfoParams): Promise<ApiResponse<ArticleDetail>> => {
  return fewFetch().get(API_ROUTE.ARTICLE(articleId));
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
    select: (data) => data.data.data,
  };
};

type ArticleInfoParams = {
  articleId: string;
};
