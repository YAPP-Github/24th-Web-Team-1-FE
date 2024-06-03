import type { NextRequest } from 'next/server';

const withOutAuthList = [];
const withAuthList = [];

// NOTE : 인증없이 접근할 수 있는 페이지에 대한 middleware
const withOutAuth = async (req: NextRequest) => {
  return req;
};

// NOTE : 인증기반 접근할 수 있는 페이지에 대한 middleware
const withAuth = async (req: NextRequest) => {};

export default async function middleware(req: NextRequest) {
  const isWithAuth = true;
  const isWithOutAuth = false;

  if (isWithAuth) return withAuth(req);
  if (isWithOutAuth) return withOutAuth(req);
}

export const config = {
  matcher: [],
};
