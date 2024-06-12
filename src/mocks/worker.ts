import { http, HttpResponse, RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

import { apiRoutes } from "@shared/constants/apiRoutes";

import response from "./response";
import { getWorkbookId } from "@workbook/utils";

export const quizHandler = http.get(apiRoutes.quiz, () =>
  HttpResponse.json(response[apiRoutes.quiz]),
);
export const tagsHandler = http.get(apiRoutes.tags, () =>
  HttpResponse.json(response[apiRoutes.tags]),
);

export const workbookHandler = http.get(apiRoutes.workbook, ({ request }) => {
  const url = new URL(request.url);
  const workbookId = getWorkbookId(request.url);

  console.log('workbookId', workbookId);
  

  if (!workbookId) {
    return new HttpResponse(null, { status: 404 });
  }
  return HttpResponse.json(response[apiRoutes.workbook]);
});

export const handlers = [quizHandler, tagsHandler, workbookHandler];
export const worker = setupWorker(...handlers);

export const implementWorker = (restHandlers: RequestHandler[]) => {
  worker.use(...restHandlers);
};

export const resetWorker = (restHandlers: RequestHandler[]) => {
  worker.resetHandlers(...restHandlers);
};
