import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";
import { _3_SECOND, delay } from "@shared/utils/delay";

import response from "./response";

export const problemsHandler = http.get(apiRoutes.problems, ({ params }) => {
  const problemId = params?.problemId;
  if (!problemId) {
    return new HttpResponse(null, { status: 404 });
  }
  if (problemId === "2")
    return HttpResponse.json(response[apiRoutes.problems + "2"]);
  else return HttpResponse.json(response[apiRoutes.problems + "get"]);
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
export const workbookHandler = http.get(
  apiRoutes.workbook,
  async ({ params }) => {
    const workbookId = params;

    if (!workbookId) {
      return new HttpResponse(null, { status: 404 });
    }

    // 딜레이 적용
    await delay(_3_SECOND);

    return HttpResponse.json(response[apiRoutes.workbook]);
  },
);

export const articleHandler = http.get(
  apiRoutes.article,
  async ({ params }) => {
    const articleId = params?.articleId;

    if (!articleId) {
      return new HttpResponse(null, { status: 404 });
    }
    switch (articleId) {
      case "1":
        return HttpResponse.json(response[apiRoutes.article + "1"]);
    }
    return HttpResponse.json(response[apiRoutes.article + "1"]);
  },
);

export const handlers = [
  problemsHandler,
  submitAnswerHandler,
  workbookHandler,
  articleHandler,
];
