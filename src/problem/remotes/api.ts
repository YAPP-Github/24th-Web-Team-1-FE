export const API_ROUTE = {
  PROBLEM: (problemId: string) => `/api/v1/problems/${problemId}`,
  PROBLEMS_WITH_ARTICLE: ({ articleId }: { articleId: string }) =>
    `/api/v1/problems?articleId=${articleId}`,
};

export const QUERY_KEY = {
  GET_PROBLEM: "get-problem-info",
  POST_PROBLEM_ANSWER: "post-problem-answer",
  GET_PROBLEMS: "get-problems",
};
