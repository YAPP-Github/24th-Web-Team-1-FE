import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, fewFetch } from "@api/fewFetch";

import { AUTH_TOKEN, COOKIES, ISLOGIN } from "@shared/constants/token";
import { tokenParse } from "@shared/utils/tokenParse";

import { API_ROUTE } from "@auth/remotes/api";
import { tokenResponse } from "@auth/types/auth";

type authMiddlewareProps = {
  req: NextRequest;
  nextUrl: NextURL;
};

export const AuthMiddleware = async ({ req, nextUrl }: authMiddlewareProps) => {
  try {
    const { searchParams } = nextUrl;
    const auth_token = searchParams.get(AUTH_TOKEN);
    if (auth_token) {
      const response: ApiResponse<tokenResponse> = await fewFetch().post(
        API_ROUTE.TOKEN(auth_token),
      );

      const authData = response.data;

      if (authData?.message === "알 수 없는 오류가 발생했어요.") {
        nextUrl.searchParams.delete(AUTH_TOKEN);
        const response = NextResponse.redirect(nextUrl);

        // response.cookies.set(COOKIES.ACCESS_TOKEN, "false");
        response.cookies.set(ISLOGIN, "false");

        return NextResponse.redirect(nextUrl);
      }
      if (authData?.data?.accessToken) {
        const accessToken = authData.data.accessToken;
        const memberEmail = tokenParse(accessToken).memberEmail;

        nextUrl.searchParams.delete(AUTH_TOKEN);
        nextUrl.searchParams.set("member_email", memberEmail);

        const response = NextResponse.redirect(nextUrl);

        response.cookies.set(COOKIES.ACCESS_TOKEN, authData?.data?.accessToken);
        response.cookies.set(
          COOKIES.REFRESH_TOKEN,
          authData?.data?.refreshToken,
        );

        return response;
      }
    }
  } catch {
    return undefined;
  }
};
