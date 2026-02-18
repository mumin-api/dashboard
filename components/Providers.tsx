'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/api/client'
import { ToastContainer } from '@/components/ui/toast'
import { CookieBanner } from '@/components/CookieBanner'
import { NextIntlClientProvider } from 'next-intl'

export function Providers({ 
    children, 
    messages, 
    locale 
}: { 
    children: React.ReactNode, 
    messages: any, 
    locale: string 
}) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer />
                <CookieBanner />
            </QueryClientProvider>
        </NextIntlClientProvider>
    )
}
