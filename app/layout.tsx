'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/api/client'
import { ToastContainer } from '@/components/ui/toast'
import { CookieBanner } from '@/components/CookieBanner'
import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Mumin Hadith API - Dashboard</title>
                <meta name="description" content="Premium Islamic-themed dashboard for Mumin Hadith API" />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ToastContainer />
                    <CookieBanner />
                </QueryClientProvider>
            </body>
        </html>
    )
}
