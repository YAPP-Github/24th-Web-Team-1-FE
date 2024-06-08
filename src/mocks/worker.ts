import { http, HttpResponse, RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

import { apiRoutes } from "@shared/constants/apiRoutes";

import response from "./response";

export const quizHandler = http.get(apiRoutes.quiz, () =>
  HttpResponse.json(response[apiRoutes.quiz]),
);
export const tagsHandler = http.get(apiRoutes.tags, () =>
  HttpResponse.json(response[apiRoutes.tags]),
);

export const handlers = [quizHandler, tagsHandler];
export const worker = setupWorker(...handlers);

export const implementWorker = (restHandlers: RequestHandler[]) => {
  worker.use(...restHandlers);
};

export const resetWorker = (restHandlers: RequestHandler[]) => {
  worker.resetHandlers(...restHandlers);
};
