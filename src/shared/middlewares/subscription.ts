import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

import { UNSUB_PARAMS } from "@shared/constants/middlewareConstant";

type saveUserInfoParams = {
  email: string;
  articleId: string;
  workbookId: string;
  nextUrl: NextURL;
};

type subscriptionMiddlewareProps = Pick<saveUserInfoParams, "nextUrl">;

export const saveUnsubscribeUserInfo = ({
  email,
  articleId,
  workbookId,
  nextUrl,
}: saveUserInfoParams) => {
  // UNSUB_PARAMS의 값을 배열로 변환하여 처리
  const paramsToDelete = Object.values(UNSUB_PARAMS);

  // searchParams.delete 반복적으로 호출
  paramsToDelete.map((param) => {
    nextUrl.searchParams.delete(param);
  });
  const decodedEmail = decodeURIComponent(email);

  // Store the email in a cookie to pass to the page
  const response = NextResponse.redirect(nextUrl);
  response.cookies.set("user-email", decodedEmail);
  response.cookies.set(UNSUB_PARAMS.ARTICLE_ID, articleId);
  response.cookies.set(UNSUB_PARAMS.WORKBOOK_ID, workbookId);

  return response;
};

export const unsubscriptionMiddleware = ({
  nextUrl,
}: subscriptionMiddlewareProps) => {
  const { searchParams } = nextUrl;

  const email = searchParams.get("user");
  const articleId = searchParams.get("articleId");
  const workbookId = searchParams.get("workbookId");

  if (email && articleId && workbookId) {
    return saveUnsubscribeUserInfo({ email, articleId, workbookId, nextUrl });
  }

  return NextResponse.next()
};
