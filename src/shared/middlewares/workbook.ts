import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const redirectToWorkbook = (nextUrl: NextURL) => {
    nextUrl.pathname = "/workbook/1";
    return NextResponse.redirect(nextUrl);
}