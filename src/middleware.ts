import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIES } from "@shared/constants/token";
import { articleMiddleware } from "@shared/middlewares/article";
import { AuthMiddleware } from "@shared/middlewares/auth";
import { problemMiddleware } from "@shared/middlewares/problem";
import { unsubscriptionMiddleware } from "@shared/middlewares/subscription";
import { workbookMiddleware } from "@shared/middlewares/workbook";

const withOutAuthList = [];
const withAuthList = [];

// NOTE : 인증없이 접근할 수 있는 페이지에 대한 middleware
const withOutAuth = async (req: NextRequest) => {
  const nextUrl = req.nextUrl.clone();
  const { pathname, searchParams } = nextUrl;

  if (pathname === "/workbook") {
    return workbookMiddleware({ nextUrl });
  }

  if (pathname.includes("/unsubscribe")) {
    return unsubscriptionMiddleware({ nextUrl });
  }

  if (pathname.includes("/article")) {
    return articleMiddleware({ nextUrl });
  }

  if (pathname.includes("/problem")) {
    return problemMiddleware({ req, nextUrl });
  }

  if (pathname.includes("/auth/validation/complete")) {
    return AuthMiddleware({ req, nextUrl });
  }
};

// NOTE : 인증기반 접근할 수 있는 페이지에 대한 middleware
const withAuth = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

  if (!accessToken) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

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
    "/",
    "/auth/:path*",
  ],
};
