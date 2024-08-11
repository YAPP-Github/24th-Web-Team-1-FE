import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { AUTH_TOKEN, ISLOGIN } from "@shared/constants/token";

import { API_ROUTE } from "@auth/remotes/api";
import { tokenResponse } from "@auth/types/auth";

type authMiddlewareProps = {
  req: NextRequest;
  nextUrl: NextURL;
};

export const AuthMiddleware = async ({ req, nextUrl }: authMiddlewareProps) => {
  try {
    const { searchParams } = nextUrl;
    const auth_token = searchParams.get(AUTH_TOKEN)
    if (auth_token) {
      const response: ApiResponse<tokenResponse> = await fewFetch().post(API_ROUTE.TOKEN(auth_token))

      const authData = response.data

      if (authData?.message === "알 수 없는 오류가 발생했어요." || !authData?.data?.isLogin) {
        nextUrl.pathname = `/auth`
        nextUrl.searchParams.delete(AUTH_TOKEN)
        
        const response = NextResponse.redirect(nextUrl);
        response.cookies.set(ISLOGIN, 'false');
        return response;
      } else {
        if (authData?.data?.isLogin) {
          return NextResponse.redirect(nextUrl);
        }
      }
    }
  } catch {
    return undefined
  }
};
