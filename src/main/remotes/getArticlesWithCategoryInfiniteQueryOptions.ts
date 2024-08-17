import { ApiResponse, fewFetch } from "@api/fewFetch";
import ArticleCardModel from "@main/models/ArticleCardModel";
import {
  ArticleClientInfo,
  ArticleServerInfo,
  ArticlesInfiniteQueryParams,
} from "@main/types/article";
import { UseInfiniteQueryOptions } from "@tanstack/react-query";
import { API_ROUTE, QUERY_KEY } from ".";

const getArticlesWithCategory = ({
  code,
  prevArticleId,
}: ArticlesInfiniteQueryParams): Promise<
  ApiResponse<AriclesWithCategoryRes<ArticleServerInfo>>
> => {
  return fewFetch().get(
    `${API_ROUTE.ARICLES_WITH_CATEGORY({ code, prevArticleId })}`,
  );
};
export const getArticlesWithCategoryInfiniteQueryOptions = ({
  code,
  isWebpBrowser,
}: Pick<ArticlesInfiniteQueryParams, "code"> & {
  isWebpBrowser: boolean;
}): UseInfiniteQueryOptions<
  ApiResponse<AriclesWithCategoryRes<ArticleServerInfo>>,
  unknown,
  AriclesWithCategoryRes<ArticleClientInfo>
> => {
  return {
    queryKey: [QUERY_KEY.GET_ARTICLES_WITH_CATEGORY, code],
    queryFn: ({ pageParam }) =>
      getArticlesWithCategory({ code, prevArticleId: pageParam as string }),
    select: (data) => {
      const articleClientList = data.pages.map((data) => {
        const res = data.data.data;
        const articleCardModel = new ArticleCardModel({
          initArticleCardServerList: res.articles,
          initIsWebpBrowser: isWebpBrowser,
        });
        return {
          ...res,
          articles: articleCardModel.articleCardList(),
        };
      });
      const lastClientResIdx = articleClientList.length - 1;
      const { isLast } = articleClientList[lastClientResIdx];

      return {
        isLast,
        articles: [...articleClientList.map((data) => data.articles).flat()],
      };
    },
    getNextPageParam: ({ data }) => {
      const articles = data.data.articles;
      const isLast = data.data.isLast;
      const lastArticleID = articles[articles.length - 1].id;
      return !isLast && lastArticleID;
    },
    initialPageParam: "0",
  };
};
type AriclesWithCategoryRes<T> = {
  articles: T[];
  isLast: boolean;
};
