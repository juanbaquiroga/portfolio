// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');

  // const isMobile = () => {
  //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  // };
  if (userAgent) {
    // Lógica para procesar el user agent
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return NextResponse.redirect(new URL('/mobile', request.url));
    }
  }

  // if (isMobile()) {
  //   return NextResponse.redirect(new URL('/mobile', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|mobile).*)'],
};