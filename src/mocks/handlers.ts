import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";

import response from "./response";
import { getWorkbookId } from "@workbook/utils";

export const quizHandler = http.get(apiRoutes.quiz, () =>
  HttpResponse.json(response[apiRoutes.quiz]),
);
export const tagsHandler = http.get(apiRoutes.tags, () =>
  HttpResponse.json(response[apiRoutes.tags]),
);

export const problemsHandler = http.get(apiRoutes.problems, ({ request }) => {
  const url = new URL(request.url);
  const articleId = url.searchParams.get("articleId");
  if (!articleId) {
    return new HttpResponse(null, { status: 404 });
  }
  return HttpResponse.json(response[apiRoutes.problems]);
});

export const workbookHandler = http.get(apiRoutes.workbook, ({ request }) => {
  const url = new URL(request.url);
  const workbookId = getWorkbookId(request.url);

  console.log('workbookId', workbookId);
  

  if (!workbookId) {
    return new HttpResponse(null, { status: 404 });
  }
  return HttpResponse.json(response[apiRoutes.workbook]);
});

export const handlers = [quizHandler, tagsHandler, problemsHandler, workbookHandler];
