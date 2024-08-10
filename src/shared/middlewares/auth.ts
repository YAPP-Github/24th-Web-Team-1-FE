import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { API_ROUTE } from "@auth/remotes/api";
import { tokenResponse } from "@auth/types/auth";

type authMiddlewareProps = {
  req: NextRequest;
  nextUrl: NextURL;
};

export const AuthMiddleware = async ({ req, nextUrl }: authMiddlewareProps) => {
  try {
    const { searchParams } = nextUrl;
    const auth_token = searchParams.get('auth_token')
    if (auth_token) {
      const response: ApiResponse<tokenResponse> = await fewFetch().post(API_ROUTE.TOKEN(auth_token))

      if (response.data?.message === "알 수 없는 오류가 발생했어요." || !response.data?.data?.isLogin) {
        nextUrl.pathname = `/auth`
        nextUrl.searchParams.delete('auth_token')
        
        const response = NextResponse.redirect(nextUrl);
        response.cookies.set('isLogin', 'false');
        return response;
      } else {
        if (response.data?.data?.isLogin) {
          return NextResponse.redirect(nextUrl);
        }
      }
    }
  } catch {
    return undefined
  }
};
