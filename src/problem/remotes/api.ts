export const PROBLEM_API_ROUTES = {
  problems: (articleId: number) => `/articles/${articleId}/problems`,
  submitAnswer: (problemId: number) => `/problems/${problemId}`,
};
