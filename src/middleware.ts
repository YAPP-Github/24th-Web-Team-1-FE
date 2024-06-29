import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

  /** /workbook 으로 진입 시 리다이랙션 */
  if (pathname === "/workbook") {
    nextUrl.pathname = "/workbook/1";
    return NextResponse.redirect(nextUrl);
  }

  /** unsubscribe page 진입 시 이메일, 아티클 아이디, 워크북 아이디 쿠키에 저장하는 로직 */
  if (email && articleId && workbookId) {
    nextUrl.searchParams.delete("user");
    nextUrl.searchParams.delete("articleId");
    nextUrl.searchParams.delete("workbookId");
    const decodedEmail = decodeURIComponent(email);

    // Store the email in a cookie to pass to the page
    const response = NextResponse.redirect(nextUrl);
    response.cookies.set("user-email", decodedEmail);
    response.cookies.set("articleId", articleId);
    response.cookies.set("workbookId", workbookId);

    return response;
  }

  if (isWithAuth) return withAuth(req);
  if (isWithOutAuth) return withOutAuth(req);

  return NextResponse.next();
}

export const config = {
  matcher: ["/unsubscribe/:path*", "/workbook/:path*"],
};
