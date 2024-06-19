import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, axiosRequest } from "@api/api-config";

import { API_ROUTE, QUERY_KEY } from "./api";
import { ArticleDetailInput, ArticleDetailOutput } from "@article/types";

export const getArticleInfo = ({
  articleId,
}: ArticleInfoParams): Promise<ApiResponse<ArticleDetailInput>> => {
  return axiosRequest("get", API_ROUTE.ARTICLE(articleId));
};
export const getArticleQueryOptions = ({
  articleId,
}: ArticleInfoParams): UseQueryOptions<
  ApiResponse<ArticleDetailInput>,
  Error,
  ArticleDetailOutput
> => {
  return {
    queryKey: [QUERY_KEY.GET_ARTICLE, articleId],
    queryFn: () => getArticleInfo({ articleId }),
    select: (data) => {
      const articleInfo = data.data;

      return {
        ...articleInfo,
        writers: [articleInfo.writer],
      };
    },
  };
};

type ArticleInfoParams = {
  articleId: string;
};
