import { CategoryClientInfo } from "@common/types/category";
import { ArticlesInfiniteQueryParams } from "@main/types/article";

export const API_ROUTE = {
  CATEGORY: "/api/v1/workbooks/categories",
  WORKBOOKS_WITH_CATEGORY: ({ code }: { code: CategoryClientInfo["code"] }) =>
    `/api/v1/workbooks?category=${code}&view=mainCard`,
  SUBSCRIBE_WORKBOOKS: `/api/v1/subscriptions/workbooks`,
  ARTICLE_CATEGORY: "/api/v1/articles/categories",
  ARICLES_WITH_CATEGORY: ({
    code,
    prevArticleId,
  }: ArticlesInfiniteQueryParams) =>
    `/api/v1/articles?prevArticleId=${prevArticleId}&categoryCd=${code}`,
};

export const QUERY_KEY = {
  GET_CATEGORY: "get-category",
  GET_ARICLE_CATEGORY: "get-article-category",
  GET_WORKBOOKS_WITH_CATEGORY: "get-workbooks-with-category",
  GET_ARTICLES_WITH_CATEGORY: "get-articles-with-category",
  GET_SUBSCRIBE_WORKBOOKS: "get-subscribe-workbooks",
};
