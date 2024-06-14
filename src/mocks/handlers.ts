import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";
import { _3_SECOND, delay } from "@shared/utils/delay";

import response from "./response";

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

export const workbookHandler = http.get(
  apiRoutes.workbook,
  async ({ request, params }) => {
    const workbookId = params;

    if (!workbookId) {
      return new HttpResponse(null, { status: 404 });
    }

    console.log(
      HttpResponse.json(response[apiRoutes.workbook]),
      apiRoutes.workbook,
    );

    // 딜레이 적용
    await delay(_3_SECOND);

    return HttpResponse.json(response[apiRoutes.workbook]);
  },
);

export const handlers = [
  quizHandler,
  tagsHandler,
  problemsHandler,
  workbookHandler,
];
