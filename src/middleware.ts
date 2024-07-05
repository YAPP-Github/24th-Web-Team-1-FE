import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  IS_EXIST_PROBLEMS,
  UNSUB_PARAMS,
} from "@shared/constants/middlewareConstant";

const withOutAuthList = [];
const withAuthList = [];

// NOTE : 인증없이 접근할 수 있는 페이지에 대한 middleware
const withOutAuth = async (req: NextRequest) => {
  return NextResponse.next();
};

// NOTE : 인증기반 접근할 수 있는 페이지에 대한 middleware
const withAuth = async (req: NextRequest) => {
  return NextResponse.next();
};

export default function middleware(req: NextRequest) {
  const isWithAuth = true;
  const isWithOutAuth = false;

  const nextUrl = req.nextUrl.clone();
  const { pathname, searchParams } = nextUrl;
  const email = searchParams.get("user");
  const articleId = searchParams.get("articleId");
  const workbookId = searchParams.get("workbookId");

  if (pathname === "/") {
    return NextResponse.redirect(
      "https://fewletter.notion.site/FEW-a87459feb21246b0bc63c68ef6140645",
    );
  }

  /** /workbook 으로 진입 시 리다이랙션 */
  if (pathname === "/workbook") {
    nextUrl.pathname = "/workbook/1";
    return NextResponse.redirect(nextUrl);
  }

  /** unsubscribe page 진입 시 이메일, 아티클 아이디, 워크북 아이디 쿠키에 저장하는 로직 */
  if (email && articleId && workbookId) {
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
  }

  if (pathname.includes("/problem")) {
    const isProblemIds = req.cookies.get(IS_EXIST_PROBLEMS)?.value === "true";

    if (!isProblemIds) {
      nextUrl.pathname = "/";
      return NextResponse.redirect(nextUrl);
    }
  }

  if (isWithAuth) return withAuth(req);
  if (isWithOutAuth) return withOutAuth(req);

  return NextResponse.next();
}

export const config = {
  matcher: ["/unsubscribe/:path*", "/workbook/:path*", "/problem/:path*"],
};
