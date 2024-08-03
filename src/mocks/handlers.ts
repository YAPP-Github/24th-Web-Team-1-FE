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
    const choiceAns = result?.sub;
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
    return HttpResponse.json(response[apiRoutes.submitAnswer + "3"]);
  },
);
export const workbooksHandler = http.get(apiRoutes.workbooks, async () => {
  return HttpResponse.json(response[apiRoutes.workbooks + "entire"]);
});
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
export const workbooksSubscriptionHandler = http.get(
  apiRoutes.workbooksSubscription,
  async () => {
    return HttpResponse.json(response[apiRoutes.workbooksSubscription]);
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

export const articleWithWorkbookHandler = http.get(
  apiRoutes.articleWithWorkbook,
  async ({ params }) => {
    const articleId = params?.articleId;
    const workbookId = params?.workbookId;

    if (!articleId && !workbookId) {
      return new HttpResponse(null, { status: 404 });
    }
    switch (workbookId) {
      case "1":
        return HttpResponse.json(response[apiRoutes.articleWithWorkbook + "1"]);
    }
    return HttpResponse.json(response[apiRoutes.articleWithWorkbook + "1"]);
  },
);

export const problemsWithArticleHandler = http.get(
  apiRoutes.problemsWithArticle,
  async ({ request }) => {
    const isArticleId = request.url.includes("articleId");
    const articleId = request.url.split("articleId=")[1];

    if (!isArticleId) {
      return new HttpResponse(null, { status: 404 });
    }
    switch (articleId) {
      case "1":
        return HttpResponse.json(response[apiRoutes.problemsWithArticle + "1"]);
    }
    return HttpResponse.json(response[apiRoutes.problemsWithArticle + "1"]);
  },
);

export const membersAuthHandler = http.post(
  apiRoutes.members,
  async ({ request }) => {
    const requestBody: any = await request.json();
    const email = requestBody?.email;

    if (!email) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(response[apiRoutes.members]);
  },
);

export const tokenHandler = http.post(apiRoutes.token, async ({ request }) => {
  return HttpResponse.json(response[apiRoutes.token]);
});

export const categoryHandler = http.get(
  apiRoutes.category,
  async ({ request }) => {
    return HttpResponse.json(response[apiRoutes.category]);
  },
);
export const articleCategoryHandler = http.get(
  apiRoutes.articleCategory,
  async ({ request }) => {
    return HttpResponse.json(response[apiRoutes.articleCategory]);
  },
);
export const handlers = [
  categoryHandler,
  problemsHandler,
  submitAnswerHandler,
  workbookHandler,
  workbooksHandler,
  workbooksSubscriptionHandler,
  articleHandler,
  articleWithWorkbookHandler,
  problemsWithArticleHandler,
  articleCategoryHandler,
  membersAuthHandler,
  tokenHandler,
];
