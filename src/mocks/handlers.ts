import { http, HttpResponse } from "msw";

import { apiRoutes } from "@shared/constants/apiRoutes";
import { _3_SECOND, delay } from "@shared/utils/delay";

import response from "./response";

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
export const workbookHandler = http.get(apiRoutes.workbook, async ({ request, params }) => {
  const workbookId = params

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
  tagsHandler,
  problemsHandler,
  submitAnswerHandler,
  workbookHandler,
];
