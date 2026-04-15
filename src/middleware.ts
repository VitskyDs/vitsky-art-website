import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip admin, API, static files, and Next.js internals
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const locale = pathname.startsWith('/en') ? 'en' : 'he'
  const response = NextResponse.next()
  response.headers.set('x-locale', locale)
  response.headers.set('x-dir', locale === 'he' ? 'rtl' : 'ltr')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
