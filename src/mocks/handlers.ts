import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";

import response from "./response";

export const quizHandler = http.get(apiRoutes.quiz, () =>
  HttpResponse.json(response[apiRoutes.quiz]),
);
export const tagsHandler = http.get(apiRoutes.tags, () =>
  HttpResponse.json(response[apiRoutes.tags]),
);

export const problemsHandler = http.get(apiRoutes.problems, ({ params }) => {
  const articleId = params?.articleId;
  if (!articleId) {
    return new HttpResponse(null, { status: 404 });
  }
  return HttpResponse.json(response[apiRoutes.problems]);
});

export const submitAnswerHandler = http.post(
  apiRoutes.submitAnswer,
  async ({ request, params }) => {
    const problemId = params?.problemId;
    const result: any = await request.json();
    const choiceAns = result?.choiceAns;

    if (!choiceAns && problemId) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(response[apiRoutes.submitAnswer]);
  },
);
export const handlers = [
  quizHandler,
  tagsHandler,
  problemsHandler,
  submitAnswerHandler,
];
