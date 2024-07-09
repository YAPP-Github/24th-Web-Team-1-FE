import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

type workbookMiddlewareProps = {
    nextUrl: NextURL
}

const redirectToWorkbook = ({ nextUrl }: workbookMiddlewareProps) => {
    nextUrl.pathname = "/workbook/1";
    return NextResponse.redirect(nextUrl);
}

export const workbookMiddleware = ({ nextUrl }: workbookMiddlewareProps) => {
    return redirectToWorkbook({ nextUrl })
}