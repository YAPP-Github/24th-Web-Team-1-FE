import { NextResponse } from "next/server";

const redirectToMain = () => {
  return NextResponse.redirect(
    "https://fewletter.notion.site/FEW-a87459feb21246b0bc63c68ef6140645",
  );
};

export const MainMiddleware = () => {
  return redirectToMain()
}
