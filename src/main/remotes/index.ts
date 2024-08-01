import { CategoryClientInfo } from "@common/types/category";

export const API_ROUTE = {
  CATEGORY: "/api/v1/workbooks/categories",
  WORKBOOKS_WITH_CATEGORY: ({ code }: { code: CategoryClientInfo["code"] }) =>
    `/api/v1/workbooks?category=${code}`,
  SUBSCRIBE_WORKBOOKS: `/api/v1/subscriptions/workbooks`,
};

export const QUERY_KEY = {
  GET_CATEGORY: "get-category",
  GET_WORKBOOKS_WITH_CATEGORY: "get-workbooks-with-category",
  GET_SUBSCRIBE_WORKBOOKS: "get-subscribe-workbooks",
};
