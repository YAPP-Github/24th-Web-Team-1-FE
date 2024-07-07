import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  LOG_PARAMS,
} from "@shared/constants/middlewareConstant";
import { setArticleLogs } from "@shared/middlewares/article";
import { redirectToMain } from "@shared/middlewares/main";
import { redirectProblemNotExist } from "@shared/middlewares/problem";
import { saveUnsubscribeUserInfo } from "@shared/middlewares/subscription";
import { redirectToWorkbook } from "@shared/middlewares/workbook";

const withOutAuthList = [];
const withAuthList = [];

// NOTE : 인증없이 접근할 수 있는 페이지에 대한 middleware
const withOutAuth = async (req: NextRequest) => {
  const nextUrl = req.nextUrl.clone();
  const { pathname, searchParams } = nextUrl;

  if (pathname === "/") {
    return redirectToMain()
  }

  if (pathname === "/workbook") {
    return redirectToWorkbook(nextUrl)
  }

  if (pathname.includes("/unsubscribe")) {
    const email = searchParams.get("user");
    const articleId = searchParams.get("articleId");
    const workbookId = searchParams.get("workbookId");

    if (email && articleId && workbookId) {
      return saveUnsubscribeUserInfo({ email, articleId, workbookId, nextUrl})
    }
  }

  if (pathname.includes("/article")) {
    const fromEmail = searchParams.get(LOG_PARAMS.FROM_EMAIL);

    if (fromEmail) {
      return setArticleLogs({ nextUrl })
    }
  }

  if (pathname.includes("/problem")) {
    return redirectProblemNotExist({ req, nextUrl })
  }

};

// NOTE : 인증기반 접근할 수 있는 페이지에 대한 middleware
const withAuth = async (req: NextRequest) => {
  return NextResponse.next();
};

export default async function middleware(req: NextRequest) {
  const isWithAuth = false;
  const isWithOutAuth = true;

  if (isWithAuth) return withAuth(req);
  if (isWithOutAuth) return withOutAuth(req);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/unsubscribe/:path*",
    "/workbook/:path*",
    "/problem/:path*",
    "/article/:path*",
    "/"
  ],
};
