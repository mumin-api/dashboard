import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/request'

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
})

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Run intl middleware first
    const response = intlMiddleware(request)

    // Get token from cookies
    const token = request.cookies.get('access_token')?.value

    // Define protected routes - check both raw and localized paths
    const isDashboard = pathname === '/dashboard' || 
                        pathname.startsWith('/dashboard/') || 
                        locales.some(lang => pathname.startsWith(`/${lang}/dashboard`))
    
    const isAuthPage = pathname === '/login' || 
                       pathname.startsWith('/login/') ||
                       pathname === '/register' ||
                       pathname.startsWith('/register/') ||
                       locales.some(lang => 
                           pathname.startsWith(`/${lang}/login`) || 
                           pathname.startsWith(`/${lang}/register`)
                       )

    // 2. Auth Logic
    // If no token, protect dashboard
    if (!token) {
        if (isDashboard) {
            const loginUrl = new URL('/login?reason=no_token', request.url)
            // Preserve locale if it's in the current path
            const currentLocale = locales.find(lang => pathname.startsWith(`/${lang}/`))
            if (currentLocale) {
                loginUrl.pathname = `/${currentLocale}/login`
            }
            return NextResponse.redirect(loginUrl)
        }
        return response
    }

    try {
        const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1'
        
        const res = await fetch(`${apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (!res.ok) {
            const loginUrl = new URL('/login?reason=auth_failed', request.url)
            const currentLocale = locales.find(lang => pathname.startsWith(`/${lang}/`))
            if (currentLocale) {
                loginUrl.pathname = `/${currentLocale}/login`
            }
            const authResponse = NextResponse.redirect(loginUrl)
            authResponse.cookies.delete('access_token')
            authResponse.cookies.delete('refresh_token')
            authResponse.cookies.delete('logged_in')
            return authResponse
        }

        // Token is valid
        if (isAuthPage) {
            const dashboardUrl = new URL('/dashboard', request.url)
            const currentLocale = locales.find(lang => pathname.startsWith(`/${lang}/`))
            if (currentLocale) {
                dashboardUrl.pathname = `/${currentLocale}/dashboard`
            }
            return NextResponse.redirect(dashboardUrl)
        }

        return response

    } catch (error: any) {
        console.error(`[Middleware] Error:`, error)
        if (isDashboard) {
            return NextResponse.redirect(new URL('/login?reason=middleware_error', request.url))
        }
        return response
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
