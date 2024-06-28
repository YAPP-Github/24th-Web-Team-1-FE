export const API_ROUTE = {
  ARTICLE: (articleId: string) => `/api/v1/articles/${articleId}`,
  ARTICLE_WITH_WORKBOOK: ({
    workbookId,
    articleId,
  }: {
    workbookId: string | null;
    articleId: string;
  }) => `/api/v1/workbooks/${workbookId}/articles/${articleId}`,
};

export const QUERY_KEY = {
  GET_ARTICLE: "get-article",
};
