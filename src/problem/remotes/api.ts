export const API_ROUTE = {
  PROBLEM: (articleId: number) => `/articles/${articleId}/problems`,
  SUBMIT_ANSWER: (problemId: number) => `/problems/${problemId}`,
};

export const QUERY_KEY = {
  GET_PROBLEM: "get-problem-info",
  POST_PROBLEM_ANSWER: "post-problem-answer",
};
