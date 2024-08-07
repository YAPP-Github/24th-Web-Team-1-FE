import { UseQueryOptions } from "@tanstack/react-query";

import { ApiResponse, fewFetch } from "@api/fewFetch";
import { StoreProblemIds } from "@problem/types/problemInfo";
import { API_ROUTE, QUERY_KEY } from "./api";

export const getProblemsInfo = ({
  articleId,
}: ArticleInfoParams): Promise<ApiResponse<StoreProblemIds>> => {
  return fewFetch().get(API_ROUTE.PROBLEMS_WITH_ARTICLE({ articleId }));
};
export const getProblemsQueryOptions = ({
  articleId,
}: ArticleInfoParams): UseQueryOptions<
  ApiResponse<StoreProblemIds>,
  Error,
  StoreProblemIds
> => {
  return {
    queryKey: [QUERY_KEY.GET_PROBLEMS, articleId],
    queryFn: () => getProblemsInfo({ articleId }),
    select: (data) => data.data.data,
  };
};

type ArticleInfoParams = {
  articleId: string;
};
