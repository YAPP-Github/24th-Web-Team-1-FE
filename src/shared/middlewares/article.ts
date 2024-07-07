import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

import { LOG_PARAMS } from "@shared/constants/middlewareConstant";
import { API_ROUTE } from "@shared/remotes";
import { LogData } from "@shared/types";

type setArticleLogsParams = {
  nextUrl: NextURL;
};

export const setArticleLogs = async ({ nextUrl }: setArticleLogsParams) => {
  try {
    const history: LogData = {
      from: "email",
      to: "readArticle",
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTE.LOGS()}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history: JSON.stringify(history),
      }),
    });
    nextUrl.searchParams.delete(LOG_PARAMS.FROM_EMAIL);
    return NextResponse.redirect(nextUrl);
  } catch (error) {
    return undefined;
  }
};
