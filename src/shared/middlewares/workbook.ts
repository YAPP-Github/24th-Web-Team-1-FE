import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

const redirectToWorkbook = (nextUrl: NextURL) => {
    nextUrl.pathname = "/workbook/1";
    return NextResponse.redirect(nextUrl);
}

export const workbookMiddleware = (nextUrl: NextURL) => {
    return redirectToWorkbook(nextUrl)
}