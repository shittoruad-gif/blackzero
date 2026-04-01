import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const publicPaths = ['/login', '/signup', '/lp', '/api/auth'];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Public paths — always allow
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // API routes for stripe webhook — allow without auth
  if (pathname.startsWith('/api/stripe/webhook')) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
