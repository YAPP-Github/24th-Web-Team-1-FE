import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { IS_EXIST_PROBLEMS } from "@shared/constants/middlewareConstant";

type setProblemNotExistParams = {
  req: NextRequest;
  nextUrl: NextURL;
};

export const redirectProblemNotExist = ({
  req,
  nextUrl,
}: setProblemNotExistParams) => {
  /** problme url 진입시 전역상태 없으면 들어올 수 없게 방어하는 로직 */
  const isProblemIds = req.cookies.get(IS_EXIST_PROBLEMS)?.value === "true";

  if (!isProblemIds) {
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }
};
