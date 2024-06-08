import { NextResponse } from "next/server";

import { apiRoutes } from "@shared/constants/apiRoutes";

import response from "@mocks/response";

export async function GET(request: Request) {
  try {
    return NextResponse.json(response[apiRoutes.tags], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
