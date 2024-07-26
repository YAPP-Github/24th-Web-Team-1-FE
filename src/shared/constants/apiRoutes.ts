export const apiRoutes = {
  problems: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems/:problemId`,
  submitAnswer: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems/:problemId`,
  workbook: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId`,
  article: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/articles/:articleId`,
  unsubscribe: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/subscriptions/all`,
  articleWithWorkbook: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/:workbookId/articles/:articleId`,
  problemsWithArticle: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/problems`,
  category: `${process.env.NEXT_PUBLIC_FEW_WEB}/api/v1/workbooks/categories`,
};
