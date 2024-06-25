import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";
import { _3_SECOND, delay } from "@shared/utils/delay";

import response from "./response";

export const problemsHandler = http.get(
  apiRoutes.problems,
  async ({ params }) => {
    const problemId = params?.problemId;
    if (!problemId || problemId === "undefined") {
      return new HttpResponse(null, { status: 404 });
    }
    switch (problemId) {
      case "1":
        return HttpResponse.json(response[apiRoutes.problems + "get1"]);
      case "2":
        return HttpResponse.json(response[apiRoutes.problems + "get2"]);
      case "3":
        return HttpResponse.json(response[apiRoutes.problems + "get3"]);
    }
    return HttpResponse.json(response[apiRoutes.problems + "get1"]);
  },
);

export const submitAnswerHandler = http.post(
  apiRoutes.submitAnswer,
  async ({ request, params }) => {
    const problemId = params?.problemId;
    const result: any = await request.json();
    const choiceAns = result?.choiceAns;
    if (!choiceAns && problemId) {
      return new HttpResponse(null, { status: 404 });
    }

    switch (problemId) {
      case "1":
        return HttpResponse.json(response[apiRoutes.submitAnswer + "1"]);
      case "2":
        return HttpResponse.json(response[apiRoutes.submitAnswer + "2"]);
      case "3":
        return HttpResponse.json(response[apiRoutes.submitAnswer + "3"]);
    }
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
