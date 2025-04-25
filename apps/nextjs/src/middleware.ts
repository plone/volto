import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-pathname` and set the pathname on it
  // This is required because you can't get the current path from an RSC
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}
