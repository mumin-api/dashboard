import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Get token from cookies
    const token = request.cookies.get('access_token')?.value

    // Define protected routes
    const isDashboard = pathname.startsWith('/dashboard')
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

    // 1. If no token, protect dashboard
    if (!token) {
        if (isDashboard) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }

    // 2. If token exists, validate it with backend
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1'
        console.log(`[Middleware] Validating token for ${pathname} at ${apiUrl}`)
        
        const res = await fetch(`${apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (!res.ok) {
            console.log(`[Middleware] Auth check failed: ${res.status} for ${pathname}`)
            // Token is invalid/expired
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('access_token')
            response.cookies.delete('refresh_token')
            response.cookies.delete('logged_in')
            return response
        }

        const userData = await res.json()
        console.log(`[Middleware] Auth success for ${userData.email || 'user'}`)

        // Token is valid
        if (isAuthPage) {
            console.log(`[Middleware] Redirecting from auth page ${pathname} to /dashboard`)
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.error(`[Middleware] Error during auth check for ${pathname}:`, error)
        if (isDashboard) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
}
